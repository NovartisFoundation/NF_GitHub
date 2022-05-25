<?php

/**
 * @file
 * Contains quiz_session.page.inc.
 *
 * Page callback for Quiz session entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Quiz session templates.
 *
 * Default template: quiz_session.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_quiz_session(array &$variables) {
  // Fetch QuizSession Entity Object.
  $quiz_session = $variables['elements']['#quiz_session'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
