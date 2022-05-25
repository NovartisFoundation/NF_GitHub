<?php

namespace Drupal\novartis_quiz\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityPublishedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the Quiz session entity.
 *
 * @ingroup novartis_quiz
 *
 * @ContentEntityType(
 *   id = "quiz_session",
 *   label = @Translation("Quiz session"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\novartis_quiz\QuizSessionListBuilder",
 *     "views_data" = "Drupal\novartis_quiz\Entity\QuizSessionViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\novartis_quiz\Form\QuizSessionForm",
 *       "add" = "Drupal\novartis_quiz\Form\QuizSessionForm",
 *       "edit" = "Drupal\novartis_quiz\Form\QuizSessionForm",
 *       "delete" = "Drupal\novartis_quiz\Form\QuizSessionDeleteForm",
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\novartis_quiz\QuizSessionHtmlRouteProvider",
 *     },
 *     "access" = "Drupal\novartis_quiz\QuizSessionAccessControlHandler",
 *   },
 *   base_table = "quiz_session",
 *   translatable = FALSE,
 *   admin_permission = "administer quiz session entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "id",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *     "published" = "status",
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/quiz_session/{quiz_session}",
 *     "add-form" = "/admin/structure/quiz_session/add",
 *     "edit-form" = "/admin/structure/quiz_session/{quiz_session}/edit",
 *     "delete-form" = "/admin/structure/quiz_session/{quiz_session}/delete",
 *     "collection" = "/admin/structure/quiz_session",
 *   },
 *   field_ui_base_route = "quiz_session.settings"
 * )
 */
class QuizSession extends ContentEntityBase implements QuizSessionInterface {

  use EntityChangedTrait;
  use EntityPublishedTrait;

  /**
   * {@inheritdoc}
   */
  public function getCreatedTime() {
    return $this->get('created')->value;
  }

  /**
   * {@inheritdoc}
   */
  public function setCreatedTime($timestamp) {
    $this->set('created', $timestamp);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public static function baseFieldDefinitions(EntityTypeInterface $entity_type) {
    $fields = parent::baseFieldDefinitions($entity_type);

    // Add the published field.
    $fields += static::publishedBaseFieldDefinitions($entity_type);

    $fields['status']->setDescription(t('A boolean indicating whether the Quiz session is published.'))
      ->setDisplayOptions('form', [
        'type' => 'boolean_checkbox',
        'weight' => -3,
      ]);

    $fields['created'] = BaseFieldDefinition::create('created')
      ->setLabel(t('Created'))
      ->setDescription(t('The time that the entity was created.'));

    $fields['changed'] = BaseFieldDefinition::create('changed')
      ->setLabel(t('Changed'))
      ->setDescription(t('The time that the entity was last edited.'));

    return $fields;
  }

}
