<?php

namespace Drupal\novartis_quiz\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;

/**
 * Provides an interface for defining Quiz session entities.
 *
 * @ingroup novartis_quiz
 */
interface QuizSessionInterface extends ContentEntityInterface, EntityChangedInterface, EntityPublishedInterface {

  /**
   * Gets the Quiz session creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Quiz session.
   */
  public function getCreatedTime();

  /**
   * Sets the Quiz session creation timestamp.
   *
   * @param int $timestamp
   *   The Quiz session creation timestamp.
   *
   * @return \Drupal\novartis_quiz\Entity\QuizSessionInterface
   *   The called Quiz session entity.
   */
  public function setCreatedTime($timestamp);

}
