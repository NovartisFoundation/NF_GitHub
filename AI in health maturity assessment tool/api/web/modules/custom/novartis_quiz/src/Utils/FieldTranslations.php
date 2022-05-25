<?php

namespace Drupal\novartis_quiz\Utils;

use Drupal\paragraphs\ParagraphInterface;

class FieldTranslations {

  /**
   * @param \Drupal\paragraphs\ParagraphInterface $paragraph
   * @param string $field
   *
   * @return array
   */
  public static function getFieldTranslations(ParagraphInterface $paragraph, string $field) {
    static $languages;
    if (!$languages) {
      $languages = \Drupal::languageManager()->getLanguages();
    }

    $data = [];
    foreach ($languages as $language) {
      if (!$paragraph->hasTranslation($language->getId())) {
        continue;
      }

      if (!$value = $paragraph->getTranslation($language->getId())->get($field)->value) {
        continue;
      }

      $languageId = $language->getId() === 'pt-pt' ? 'pt' : $language->getId();
      $data[$languageId] = $value;
    }

    return $data;
  }

}
