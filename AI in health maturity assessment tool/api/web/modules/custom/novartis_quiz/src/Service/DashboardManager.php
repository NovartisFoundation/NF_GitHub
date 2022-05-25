<?php

namespace Drupal\novartis_quiz\Service;

use Drupal\novartis_quiz\Entity\Area;

/**
 * Class DashboardManager
 *
 * @package Drupal\novartis_quiz\Service
 */
class DashboardManager
{

  /** @var array */
  private $areaTotals = [];

  /** @var int */
  private $maximumSessionScore = 0;

  /** @var array */
  private $finishedSessions = [];

  /**
   * @param null $country
   *
   * @return array
   */
  public function getStats($country = NULL): array
  {
    $this->init();

    $totalSessionQuery = \Drupal::entityQuery('quiz_session')->count();
    if ($country) {
      $totalSessionQuery->condition('field_quiz_session_country', $country);
    }

    $totalSessions = $totalSessionQuery->execute();

    $query = \Drupal::database()->select('quiz_session', 'qs');
    $query->fields('qs', ['id']);
    $query->join('quiz_session__field_quiz_session_area_results', 'qs_ar', 'qs_ar.entity_id = qs.id');
    $query->join('area_result', 'ar', 'ar.id = qs_ar.field_quiz_session_area_results_target_id');
    $query->join('area_result__field_area_result_area', 'ar_a', 'ar_a.entity_id = ar.id');
    if ($country) {
      $query->join('quiz_session__field_quiz_session_country', 'qs_c', 'qs_c.entity_id = qs.id');
      $query->where('qs_c.field_quiz_session_country_value = :country', [':country' => $country]);
    }

    $query->groupBy('qs.id');
    $query->having('COUNT(qs.id) = :total_area_count', [':total_area_count' => 6]);
    $finishedSessions = count($query->execute()->fetchAllAssoc('id', \PDO::FETCH_ASSOC));
    $unfinishedSessions = $totalSessions - $finishedSessions;
    $best = $this->getExtremum('DESC', $country);
    $worst = $this->getExtremum('ASC', $country);

    return [
      'total_participants' => $totalSessions,
      'best' => number_format($best, 2),
      'worst' => number_format($worst, 2),
      'countries' => $this->getStatsByCountries(),
      'topology' => $this->getTopology($country),
      'area_average' => $this->getAreaAverages($country),
      'complete_assessment_pourcent' => [
        'number' => $finishedSessions,
        'pourcent' => $finishedSessions ? number_format($finishedSessions / $totalSessions * 100, 2) : NULL,
      ],
      'uncomplete_assessment_pourcent' => [
        'number' => $unfinishedSessions,
        'pourcent' => $unfinishedSessions ? number_format($unfinishedSessions / $totalSessions * 100, 2) : NULL,
      ],
    ];
  }

  /**
   * @return array
   */
  private function getStatsByCountries(): array
  {
    $countryCount = \Drupal::database()->select('quiz_session__field_quiz_session_country', 'qs_c')
      ->groupBy('qs_c.field_quiz_session_country_value')
      ->countQuery()
      ->execute()
      ->fetchField();

    $query = \Drupal::database()->select('quiz_session', 'qs');
    $query->join('quiz_session__field_quiz_session_country', 'qs_c', 'qs_c.entity_id = qs.id');
    $query->fields('qs_c', ['field_quiz_session_country_value']);
    $query->addExpression('COUNT(*)', 'country_count');
    $query->groupBy('qs_c.field_quiz_session_country_value');
    $query->orderBy('country_count', 'DESC');
    $query->range(0, 5);
    $topCountries = $query->execute()->fetchAllAssoc('field_quiz_session_country_value', \PDO::FETCH_ASSOC);

    $formattedTopCountries = [];
    foreach ($topCountries as $country) {
      $formattedTopCountries[] = [
        'name' => $country['field_quiz_session_country_value'],
        'count' => $country['country_count'],
      ];
    }

    return [
      'total' => $countryCount,
      'top' => $formattedTopCountries,
    ];
  }

  /**
   * @param $country
   *
   * @return array
   */
  private function getTopology($country): array
  {
    $query = \Drupal::database()->select('quiz_session', 'qs');
    $query->join('quiz_session__field_quiz_session_group', 'qs_g', 'qs_g.entity_id = qs.id');
    $query->fields('qs_g', ['field_quiz_session_group_value']);
    $query->addExpression('COUNT(*)', 'group_count');
    if ($country) {
      $query->join('quiz_session__field_quiz_session_country', 'qs_c', 'qs_c.entity_id = qs.id');
      $query->where('qs_c.field_quiz_session_country_value = :country', [':country' => $country]);
    }

    $query->groupBy('qs_g.field_quiz_session_group_value');
    $query->orderBy('group_count', 'DESC');
    $query->range(0, 5);
    $topGroups = $query->execute()->fetchAllAssoc('field_quiz_session_group_value', \PDO::FETCH_ASSOC);

    $formattedTopGroups = [];
    foreach ($topGroups as $group) {
      $formattedTopGroups[] = [
        'name' => $group['field_quiz_session_group_value'],
        'count' => $group['group_count'],
      ];
    }

    return $formattedTopGroups;
  }

  /**
   * @param $country
   *
   * @return array
   */
  private function getAreaAverages($country): array
  {
    if (empty($this->finishedSessions)) {
      return [];
    }

    $query = \Drupal::database()->select('quiz_session', 'qs');
    $query->join('quiz_session__field_quiz_session_area_results', 'qs_ar', 'qs_ar.entity_id = qs.id');
    $query->join('area_result', 'ar', 'ar.id = qs_ar.field_quiz_session_area_results_target_id');
    $query->join('area_result__field_area_result_score', 'ar_s', 'ar_s.entity_id = ar.id');
    $query->join('area_result__field_area_result_area', 'ar_a', 'ar_a.entity_id = ar.id');
    $query->join('area', 'a', 'a.id = ar_a.field_area_result_area_target_id');
    $query->join('area__field_area_slug', 'a_s', 'a_s.entity_id = a.id');
    if ($country) {
      $query->join('quiz_session__field_quiz_session_country', 'qs_c', 'qs_c.entity_id = qs.id');
      $query->where('qs_c.field_quiz_session_country_value = :country', [':country' => $country]);
    }

    $query->fields('a_s', ['field_area_slug_value']);
    $query->addExpression('AVG(ar_s.field_area_result_score_value)', 'average');
    $query->groupBy('a_s.field_area_slug_value');
    $query->condition('qs.id', $this->finishedSessions, 'IN');

    $averages = $query->execute()->fetchAllAssoc('field_area_slug_value', \PDO::FETCH_ASSOC);

    $formattedAverages = [];
    foreach ($averages as $average) {
      if (!isset($this->areaTotals[$average['field_area_slug_value']])) {
        continue;
      }

      $averageOnTen = (float)$average['average'] / $this->areaTotals[$average['field_area_slug_value']] * 10;
      $formattedAverages[] = [
        'slug' => $average['field_area_slug_value'],
        'total' => number_format($averageOnTen, 2),
      ];
    }

    return $formattedAverages;
  }

  /**
   * @param $order
   * @param $country
   *
   * @return string|NULL
   */
  private function getExtremum($order, $country)
  {
    $query = \Drupal::database()->select('quiz_session', 'qs');
    $query->addExpression('SUM(ar_s.field_area_result_score_value)', 'total');
    $query->join('quiz_session__field_quiz_session_area_results', 'qs_ar', 'qs_ar.entity_id = qs.id');
    $query->join('area_result', 'ar', 'ar.id = qs_ar.field_quiz_session_area_results_target_id');
    $query->join('area_result__field_area_result_score', 'ar_s', 'ar_s.entity_id = ar.id');
    if ($country) {
      $query->join('quiz_session__field_quiz_session_country', 'qs_c', 'qs_c.entity_id = qs.id');
      $query->where('qs_c.field_quiz_session_country_value = :country', [':country' => $country]);
    }

    $query->groupBy('qs.id');
    $query->having('COUNT(*) = :total_area_count', [':total_area_count' => 6]);
    $query->orderBy('total', $order);
    $query->range(0, 1);
    if (!$result = $query->execute()->fetchField()) {
      return 0;
    }

    return ((int)$result / $this->maximumSessionScore) * 10;
  }

  /**
   * @return void
   */
  private function init()
  {
    $finishedSessionsQuery = \Drupal::database()->select('quiz_session', 'qs');
    $finishedSessionsQuery->addExpression('qs.id', 'id');
    $finishedSessionsQuery->join('quiz_session__field_quiz_session_area_results', 'qs_ar', 'qs_ar.entity_id = qs.id');
    $finishedSessionsQuery->join('area_result', 'ar', 'ar.id = qs_ar.field_quiz_session_area_results_target_id');
    $finishedSessionsQuery->groupBy('id');
    $finishedSessionsQuery->having('COUNT(*) = :total_area_count', [':total_area_count' => 6]);
    $this->finishedSessions = array_keys($finishedSessionsQuery->execute()->fetchAllKeyed());

    $areas = Area::loadMultiple();
    $maximumSessionScore = 0;
    foreach ($areas as $area) {
      $maximumAreaScore = 0;
      foreach ($area->get('field_area_pillars')->referencedEntities() as $pillar) {
        $questions = $pillar->get('field_pillar_questions')->referencedEntities();
        foreach ($questions as $question) {
          $highestScore = NULL;
          foreach ($question->get('field_question_answers')->referencedEntities() as $answer) {
            $score = $answer->get('field_answer_score')->value;
            if (!$highestScore || $highestScore < $score) {
              $highestScore = $score;
            }
          }

          $maximumAreaScore += $highestScore;
        }
      }

      $this->areaTotals[$area->get('field_area_slug')->value] = $maximumAreaScore;
      $maximumSessionScore += $maximumAreaScore;
    }

    $this->maximumSessionScore = $maximumSessionScore;
  }

}
