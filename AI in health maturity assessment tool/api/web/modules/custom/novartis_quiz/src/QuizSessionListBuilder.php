<?php

namespace Drupal\novartis_quiz;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\EntityListBuilder;

/**
 * Defines a class to build a listing of Quiz session entities.
 *
 * @ingroup novartis_quiz
 */
class QuizSessionListBuilder extends EntityListBuilder {

  /**
   * {@inheritdoc}
   */
  public function buildHeader() {
    $header['token'] = $this->t('Quiz token');
    $header['country'] = $this->t('Country');
    $header['group'] = $this->t('Group');
    return $header + parent::buildHeader();
  }

  /**
   * {@inheritdoc}
   */
  public function buildRow(EntityInterface $entity) {
    /* @var \Drupal\novartis_quiz\Entity\QuizSession $entity */
    $row['id'] = $entity->get('field_quiz_session_token')->value;
    $row['country'] = $entity->get('field_quiz_session_country')->value;
    $row['group'] = $entity->get('field_quiz_session_group')->value;

    return $row + parent::buildRow($entity);
  }

}
