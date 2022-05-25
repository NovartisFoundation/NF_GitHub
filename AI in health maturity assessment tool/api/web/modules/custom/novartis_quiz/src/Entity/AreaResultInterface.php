<?php

namespace Drupal\novartis_quiz\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;

/**
 * Provides an interface for defining Area result entities.
 *
 * @ingroup novartis_quiz
 */
interface AreaResultInterface extends ContentEntityInterface, EntityChangedInterface, EntityPublishedInterface {

  /**
   * Gets the Area result creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Area result.
   */
  public function getCreatedTime();

  /**
   * Sets the Area result creation timestamp.
   *
   * @param int $timestamp
   *   The Area result creation timestamp.
   *
   * @return \Drupal\novartis_quiz\Entity\AreaResultInterface
   *   The called Area result entity.
   */
  public function setCreatedTime($timestamp);

}
