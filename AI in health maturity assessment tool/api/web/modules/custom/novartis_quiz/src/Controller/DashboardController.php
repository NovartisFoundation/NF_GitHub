<?php

namespace Drupal\novartis_quiz\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\novartis_quiz\Entity\Area;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class DashboardController
 */
class DashboardController extends ControllerBase {

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   */
  public function getSessions(Request $request) {
    $areas = Area::loadMultiple();
    $serializer = \Drupal::service('serializer');
    $results = \Drupal::service('novartis_quiz.session_manager')
      ->getSessions(
        $request->query->get('page'),
        $request->query->get('date'),
        $request->query->get('country'),
      );

    $data = [
      'areas' => array_values($areas),
      'rows' => $results,
    ];

    return new JsonResponse(
      $serializer->serialize($data, 'json', ['scope' => 'dashboard']),
      Response::HTTP_OK,
      [],
      TRUE
    );
  }

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   */
  public function getStats(Request $request) {
    $stats = \Drupal::service('novartis_quiz.dashboard_manager')->getStats($request->query->get('country'));

    return new JsonResponse($stats);
  }

}
