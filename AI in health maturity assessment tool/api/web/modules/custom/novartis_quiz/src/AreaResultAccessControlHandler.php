<?php

namespace Drupal\novartis_quiz;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Area result entity.
 *
 * @see \Drupal\novartis_quiz\Entity\AreaResult.
 */
class AreaResultAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\novartis_quiz\Entity\AreaResultInterface $entity */

    switch ($operation) {

      case 'view':

        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished area result entities');
        }


        return AccessResult::allowedIfHasPermission($account, 'view published area result entities');

      case 'update':

        return AccessResult::allowedIfHasPermission($account, 'edit area result entities');

      case 'delete':

        return AccessResult::allowedIfHasPermission($account, 'delete area result entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add area result entities');
  }


}
