<?php

namespace Drupal\novartis_quiz\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\novartis_quiz\Entity\QuizSession;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class SessionController
 *
 * @package Drupal\novartis_quiz\Controller
 */
class SessionController extends ControllerBase {

  /**
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function initializeSession(Request $request) {
    $data = json_decode($request->getContent(), TRUE);
    if (empty($data['country']) || empty($data['group'])) {
      return new JsonResponse([], Response::HTTP_NOT_FOUND);
    }

    /** @var QuizSession $session */
    $session = QuizSession::create([
      'field_quiz_session_country' => $data['country'],
      'field_quiz_session_group' => $data['group'],
      'field_quiz_session_role' => $data['role'],
    ]);

    $session->save();

    $token = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 10);
    $session->set('field_quiz_session_token', $token)->save();

    return new JsonResponse(['session_id' => $session->id(), 'token' => $token]);
  }

  /**
   * @param $token
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   */
  public function getSession($token) {
    $session = \Drupal::service('novartis_quiz.session_manager')->getSession($token);
    if (!$session instanceof QuizSession) {
      return new JsonResponse([], Response::HTTP_NOT_FOUND);
    }

    $serializer = \Drupal::service('serializer');

    return new JsonResponse($serializer->serialize($session, 'json'), Response::HTTP_OK, [], TRUE);
  }

  /**
   * @param $token
   * @param \Symfony\Component\HttpFoundation\Request $request
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   */
  public function addResult($token, Request $request) {
    $data = json_decode($request->getContent(), TRUE);
    if (empty($data['area']) || empty($data['score']) || empty($data['pillars'])) {
      return new JsonResponse([], Response::HTTP_BAD_REQUEST);
    }

    $result = \Drupal::service('novartis_quiz.session_manager')
      ->addResult($token, $data['area'], $data['score'], $data['pillars']);

    if (!$result) {
      return new JsonResponse([], Response::HTTP_BAD_REQUEST);
    }

    return new JsonResponse([], Response::HTTP_OK);
  }

}
