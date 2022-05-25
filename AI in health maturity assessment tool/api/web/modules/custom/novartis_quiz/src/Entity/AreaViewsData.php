<?php

namespace Drupal\novartis_quiz\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Area entities.
 */
class AreaViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.
    return $data;
  }

}
