<?php

namespace Drupal\novartis_quiz\Service;

use Drupal\novartis_quiz\Entity\Area;
use Drupal\novartis_quiz\Entity\AreaResult;
use Drupal\novartis_quiz\Entity\QuizSession;

/**
 * Class QuizSessionManager
 */
class QuizSessionManager {

  /**
   * @param string $sessionToken
   * @param string $areaSlug
   * @param int $score
   * @param array $pillars
   *
   * @return bool
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function addResult(string $sessionToken, string $areaSlug, int $score, array $pillars): bool {
    $areaIds = \Drupal::entityQuery('area')
      ->condition('field_area_slug', $areaSlug)
      ->execute();

    $area = Area::load(reset($areaIds));
    if (!$area instanceof Area) {
      return FALSE;
    }

    $session = $this->getSession($sessionToken);
    if (!$session instanceof QuizSession) {
      return FALSE;
    }

    \Drupal::service('cache_tags.invalidator')->invalidateTags(['rebuild-session-list']);

    $result = $this->getResult($areaSlug, $sessionToken);
    if ($result instanceof AreaResult) {
      // Update the existing result
      $result->set('field_area_result_score', $score);
      $result->set('field_area_result_pillars', json_encode($pillars));
      $result->save();

      return TRUE;
    }

    $result = AreaResult::create([
      'field_area_result_score' => $score,
      'field_area_result_area' => $area,
      'field_area_result_pillars' => json_encode($pillars),
    ]);

    $result->save();

    $session->get('field_quiz_session_area_results')->appendItem($result);
    $session->save();

    return TRUE;
  }

  /**
   * @param $areaSlug
   * @param $sessionToken
   *
   * @return \Drupal\novartis_quiz\Entity\AreaResult
   */
  public function getResult($areaSlug, $sessionToken): ?AreaResult {
    $areaIds = \Drupal::entityQuery('area')
      ->condition('field_area_slug', $areaSlug)
      ->execute();

    $area = Area::load(reset($areaIds));
    if (!$area instanceof Area) {
      return NULL;
    }

    $session = $this->getSession($sessionToken);
    if (!$session instanceof QuizSession) {
      return NULL;
    }

    $query = \Drupal::database()->select('quiz_session', 'qs');
    $query->join('quiz_session__field_quiz_session_area_results', 'qs_ar', 'qs_ar.entity_id = qs.id');
    $query->join('quiz_session__field_quiz_session_token', 'qs_t', 'qs_t.entity_id = qs.id');
    $query->join('area_result', 'ar', 'ar.id = qs_ar.field_quiz_session_area_results_target_id');
    $query->join('area_result__field_area_result_area', 'ar_a', 'ar_a.entity_id = ar.id');
    $query->fields('ar', ['id']);
    $query->condition('qs_t.field_quiz_session_token_value', $sessionToken);
    $query->condition('ar_a.field_area_result_area_target_id', $area->id());

    $resultIds = $query->execute()->fetchAssoc();

    if (empty($resultIds)) {
      return NULL;
    }

    $result = AreaResult::load(reset($resultIds));
    if (!$result instanceof AreaResult) {
      return NULL;
    }

    return $result;
  }

  /**
   * @param $token
   *
   * @return \Drupal\novartis_quiz\Entity\QuizSession
   */
  public function getSession($token): ?QuizSession {
    $sessionIds = \Drupal::entityQuery('quiz_session')
      ->condition('field_quiz_session_token', $token)
      ->range(0, 1)
      ->execute();

    if (empty($sessionIds)) {
      return NULL;
    }

    $session = QuizSession::load(array_shift($sessionIds));
    if (!$session instanceof QuizSession) {
      return NULL;
    }

    return $session;
  }

  /**
   * @param int $page
   * @param null $date
   * @param null $country
   *
   * @return array
   * @throws \Exception
   */
  public function getSessions($page = 0, $date = NULL, $country = NULL): array {
    $query = \Drupal::entityQuery('quiz_session');

    if ($date) {
      $date = new \DateTime($date);

      $query->condition(
        'created',
        [$date->getTimestamp(), $date->add(new \DateInterval('P1D'))->getTimestamp()],
        'BETWEEN'
      );
    }

    if ($country) {
      $query->condition('field_area_result_country', $country);
    }

    $sessionIds = $query
      ->sort('created', 'DESC')
      ->execute();

    if (empty($sessionIds)) {
      return [];
    }

    return array_values(QuizSession::loadMultiple($sessionIds));
  }

}
