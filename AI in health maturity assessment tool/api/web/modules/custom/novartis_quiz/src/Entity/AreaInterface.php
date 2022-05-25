<?php

namespace Drupal\novartis_quiz\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\Core\Entity\EntityPublishedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Area entities.
 *
 * @ingroup novartis_quiz
 */
interface AreaInterface extends ContentEntityInterface, EntityChangedInterface, EntityPublishedInterface, EntityOwnerInterface {

  /**
   * Add get/set methods for your configuration properties here.
   */

  /**
   * Gets the Area name.
   *
   * @return string
   *   Name of the Area.
   */
  public function getName();

  /**
   * Sets the Area name.
   *
   * @param string $name
   *   The Area name.
   *
   * @return \Drupal\novartis_quiz\Entity\AreaInterface
   *   The called Area entity.
   */
  public function setName($name);

  /**
   * Gets the Area creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Area.
   */
  public function getCreatedTime();

  /**
   * Sets the Area creation timestamp.
   *
   * @param int $timestamp
   *   The Area creation timestamp.
   *
   * @return \Drupal\novartis_quiz\Entity\AreaInterface
   *   The called Area entity.
   */
  public function setCreatedTime($timestamp);

}
