<?php

/**
 * @file
 * Contains area_result.page.inc.
 *
 * Page callback for Area result entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Area result templates.
 *
 * Default template: area_result.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_area_result(array &$variables) {
  // Fetch AreaResult Entity Object.
  $area_result = $variables['elements']['#area_result'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
