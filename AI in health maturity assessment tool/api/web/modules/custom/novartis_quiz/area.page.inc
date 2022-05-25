<?php

/**
 * @file
 * Contains area.page.inc.
 *
 * Page callback for Area entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Area templates.
 *
 * Default template: area.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_area(array &$variables) {
  // Fetch Area Entity Object.
  $area = $variables['elements']['#area'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
