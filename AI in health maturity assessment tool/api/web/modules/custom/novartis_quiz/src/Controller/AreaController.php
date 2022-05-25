<?php

namespace Drupal\novartis_quiz\Controller;

use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Controller\ControllerBase;
use Drupal\novartis_quiz\Entity\Area;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;


/**
 * Class AreaController
 *
 * @package Drupal\novartis_quiz\Controller
 */
class AreaController extends ControllerBase {

  /**
   * @return \Drupal\Core\Cache\CacheableJsonResponse
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function getAll() {
    $serializer = \Drupal::service('serializer');
    /** @var \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager */
    $entityTypeManager = \Drupal::service('entity_type.manager');

    $areasIds = \Drupal::entityQuery('area')
      ->condition('status', TRUE)
      ->execute();

    // Quick cheat to remove IDs as key because we don't want them to be use like this in the response
    $entities = array_values(Area::loadMultiple($areasIds));

    $tags = $entityTypeManager->getDefinition('area')->getListCacheTags();
    $cacheMeta = new CacheableMetadata();
    $cacheMeta->addCacheTags($tags);

    $response = new CacheableJsonResponse($serializer->serialize($entities, 'json'), Response::HTTP_OK, [], TRUE);
    $response->addCacheableDependency($cacheMeta);

    return $response;
  }

}
