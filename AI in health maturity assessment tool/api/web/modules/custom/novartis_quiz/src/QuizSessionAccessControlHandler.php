<?php

namespace Drupal\novartis_quiz;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Quiz session entity.
 *
 * @see \Drupal\novartis_quiz\Entity\QuizSession.
 */
class QuizSessionAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\novartis_quiz\Entity\QuizSessionInterface $entity */

    switch ($operation) {

      case 'view':

        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished quiz session entities');
        }


        return AccessResult::allowedIfHasPermission($account, 'view published quiz session entities');

      case 'update':

        return AccessResult::allowedIfHasPermission($account, 'edit quiz session entities');

      case 'delete':

        return AccessResult::allowedIfHasPermission($account, 'delete quiz session entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add quiz session entities');
  }


}
