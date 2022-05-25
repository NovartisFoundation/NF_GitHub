<?php

namespace Drupal\novartis_quiz\Entity;

use Drupal\Core\Field\BaseFieldDefinition;
use Drupal\Core\Entity\ContentEntityBase;
use Drupal\Core\Entity\EntityChangedTrait;
use Drupal\Core\Entity\EntityPublishedTrait;
use Drupal\Core\Entity\EntityTypeInterface;

/**
 * Defines the Area result entity.
 *
 * @ingroup novartis_quiz
 *
 * @ContentEntityType(
 *   id = "area_result",
 *   label = @Translation("Area result"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\novartis_quiz\AreaResultListBuilder",
 *     "views_data" = "Drupal\novartis_quiz\Entity\AreaResultViewsData",
 *
 *     "form" = {
 *       "default" = "Drupal\novartis_quiz\Form\AreaResultForm",
 *       "add" = "Drupal\novartis_quiz\Form\AreaResultForm",
 *       "edit" = "Drupal\novartis_quiz\Form\AreaResultForm",
 *       "delete" = "Drupal\novartis_quiz\Form\AreaResultDeleteForm",
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\novartis_quiz\AreaResultHtmlRouteProvider",
 *     },
 *     "access" = "Drupal\novartis_quiz\AreaResultAccessControlHandler",
 *   },
 *   base_table = "area_result",
 *   translatable = FALSE,
 *   admin_permission = "administer area result entities",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "id",
 *     "uuid" = "uuid",
 *     "langcode" = "langcode",
 *     "published" = "status",
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/area_result/{area_result}",
 *     "add-form" = "/admin/structure/area_result/add",
 *     "edit-form" = "/admin/structure/area_result/{area_result}/edit",
 *     "delete-form" = "/admin/structure/area_result/{area_result}/delete",
 *     "collection" = "/admin/structure/area_result",
 *   },
 *   field_ui_base_route = "area_result.settings"
 * )
 */
class AreaResult extends ContentEntityBase implements AreaResultInterface {

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

    $fields['status']->setDescription(t('A boolean indicating whether the Area result is published.'))
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
