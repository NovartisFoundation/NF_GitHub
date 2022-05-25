<?php

namespace Drupal\novartis_quiz\Normalizer;

use Drupal\novartis_quiz\Entity\Area;
use Drupal\novartis_quiz\Utils\FieldTranslations;
use Drupal\serialization\Normalizer\ContentEntityNormalizer;

/**
 * Class AreaNormalizer
 *
 * @package Drupal\novartis_quiz\Normalizer
 */
class AreaNormalizer extends ContentEntityNormalizer {

  /**
   * @var string
   */
  protected $supportedInterfaceOrClass = 'Drupal\novartis_quiz\Entity\Area';

  /**
   * @param \Drupal\novartis_quiz\Entity\Area $object
   * @param null $format
   * @param array $context
   *
   * @return array
   */
  public function normalize($object, $format = NULL, array $context = []) {
    $pillars = $this->getPillars($object);
    $maximumScore = 0;
    foreach ($pillars as $pillar) {
      $maximumScore += $pillar['maximum_score'];
    }
    
    $data = [
      'title' => $object->label(),
      'slug' => $object->get('field_area_slug')->value,
      'maximum_score' => $maximumScore,
    ];

    if (!isset($context['scope']) || $context['scope'] !== 'dashboard') {
      $data['pillars'] = $pillars;
    }

    return $data;
  }

  /**
   * @param \Drupal\novartis_quiz\Entity\Area $area
   *
   * @return array
   */
  private function getPillars(Area $area) {
    $pillars = [];
    if ($area->get('field_area_pillars')->isEmpty()) {
      return $pillars;
    }

    /** @var \Drupal\paragraphs\ParagraphInterface $pillars */
    $pillars = $area->get('field_area_pillars')->referencedEntities();
    $normalizedPillars = [];
    foreach ($pillars as $pillar) {
      /** @var \Drupal\paragraphs\ParagraphInterface $questions */
      $questions = $pillar->get('field_pillar_questions')->referencedEntities();

      $maximumPillarScore = 0;
      $normalizedQuestions = [];
      foreach ($questions as $question) {
        $normalizedAnswers = [];
        $highestScore = NULL;
        $type = $question->bundle() === 'image_question' ? 'image' : 'emoji';
        foreach ($question->get('field_question_answers')->referencedEntities() as $answer) {
          $score = $answer->get('field_answer_score')->value;
          if (!$highestScore || $highestScore < $score) {
            $highestScore = $score;
          }

          $normalizedAnswers[] = [
            'answer' => FieldTranslations::getFieldTranslations($answer, 'field_answer_title'),
            'tooltip' => FieldTranslations::getFieldTranslations($answer, 'field_answer_tooltip'),
            'visual' => $type === 'image' ?
              $answer->get('field_image_answer_visual')->entity->createFileUrl(FALSE)
              : $answer->get('field_emoji_answer_visual')->value,
            'score' => $score,
          ];
        }

        $maximumPillarScore += $highestScore;
        $normalizedQuestions[] = [
          'type' => $type,
          'question' => FieldTranslations::getFieldTranslations($question, 'field_question_title'),
          'theme' => FieldTranslations::getFieldTranslations($question, 'field_question_theme'),
          'answers' => $normalizedAnswers,
        ];
      }

      $normalizedPillars[] = [
        'title' => FieldTranslations::getFieldTranslations($pillar, 'field_pillar_title'),
        'slug' => $pillar->get('field_pillar_slug')->value,
        'maximum_score' => $maximumPillarScore,
        'question' => $normalizedQuestions,
      ];
    }

    return $normalizedPillars;
  }

}
