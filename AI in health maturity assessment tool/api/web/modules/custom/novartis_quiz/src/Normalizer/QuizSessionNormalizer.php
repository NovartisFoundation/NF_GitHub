<?php

namespace Drupal\novartis_quiz\Normalizer;

use Drupal\novartis_quiz\Entity\Area;
use Drupal\novartis_quiz\Utils\FieldTranslations;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\serialization\Normalizer\ContentEntityNormalizer;

/**
 * Class QuizSessionNormalizer
 *
 * @package Drupal\novartis_quiz\Normalizer
 */
class QuizSessionNormalizer extends ContentEntityNormalizer {

  /**
   * @var string
   */
  protected $supportedInterfaceOrClass = 'Drupal\novartis_quiz\Entity\QuizSession';

  /**
   * @param \Drupal\novartis_quiz\Entity\QuizSession $object
   * @param null $format
   * @param array $context
   *
   * @return array
   */
  public function normalize($object, $format = NULL, array $context = []) {
    $results = [];
    foreach ($object->get('field_quiz_session_area_results')->referencedEntities() as $result) {
      $resultArea = $result->get('field_area_result_area')->entity;
      if (!$resultArea instanceof Area) {
        continue;
      }

      $formattedResult = [
        'area' => $resultArea->get('field_area_slug')->value,
        'score' => $result->get('field_area_result_score')->value,
      ];

      if (!isset($context['scope']) || $context['scope'] !== 'dashboard') {
        $pillarsResults = $this->formatPillarsResults(json_decode($result->get('field_area_result_pillars')->value, TRUE));
        $formattedResult['pillars'] = $pillarsResults;
      }

      $results[] = $formattedResult;
    }

    return [
      'id' => $object->id(),
      'country' => $object->get('field_quiz_session_country')->value,
      'group' => $object->get('field_quiz_session_group')->value,
      'role' => $object->get('field_quiz_session_role')->value,
      'date' => \Drupal::service('date.formatter')->format($object->getCreatedTime(), 'custom', 'd/m/Y'),
      'results' => $results,
    ];
  }

  /**
   * @param array|null $pillarsResults
   *
   * @return array
   */
  private function formatPillarsResults(?array $pillarsResults) {
    if (empty($pillarsResults)) {
      return [];
    }

    $formattedResults = [];
    foreach ($pillarsResults as $pillarResult) {
      $pillarId = \Drupal::entityQuery('paragraph')
        ->condition('type', 'pillar')
        ->condition('field_pillar_slug', $pillarResult['slug'])
        ->execute();

      if (empty($pillarId)) {
        continue;
      }

      /** @var \Drupal\paragraphs\ParagraphInterface $pillar */
      $pillar = Paragraph::load(reset($pillarId));
      $formattedResults[] = [
        'score' => $pillarResult['score'],
        'slug' => $pillarResult['slug'],
        'title' => FieldTranslations::getFieldTranslations($pillar, 'field_pillar_title'),
      ];
    }

    return $formattedResults;
  }

}
