<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

trait ApiRespond
{
    /**
     * Variable for API JSON Response
     */
    public $defaultMaxLimit = 1000;
    public $statusCode = 200;
    public $apiMessage = '';
    public $error = false;
    public $errors = [];
    public $debugInfo = [];
    public $errorCode = 0;

    /**
     * Function to return an error response.
     *
     * @param $message
     * @return mixed
     */
    public function respondWithError($message)
    {
        $this->error = true;
        $this->apiMessage = $message;
        return $this->respond(array());
    }

    /**
     * Function to return an unauthorized response.
     *
     * @param string $message
     * @return mixed
     */
    public function respondUnauthorizedError($message = 'Unauthorized!')
    {
        $this->statusCode = Response::HTTP_UNAUTHORIZED;
        return $this->respondWithError($message);
    }


    /**
     * Function to return a bad request response.
     *
     * @param string $message
     * @return mixed
     */
    public function respondBadRequestError($message = 'Bad Request!')
    {
        $this->statusCode = Response::HTTP_BAD_REQUEST;
        return $this->respondWithError($message);
    }

    /**
     * Function to return forbidden error response.
     *
     * @param string $message
     *
     * @return mixed
     */
    public function respondForbiddenError($message = 'Forbidden!')
    {
        $this->statusCode = Response::HTTP_FORBIDDEN;
        return $this->respondWithError($message);
    }

    /**
     * Function to return a Not Found response.
     *
     * @param string $message
     * @return mixed
     */
    public function respondNotFound($message = 'Resource Not Found')
    {
        $this->statusCode = Response::HTTP_NOT_FOUND;
        return $this->respondWithError($message);
    }

    /**
     * Function to return an internal error response.
     *
     * @param string $message
     * @param array $errors
     *
     * @return mixed
     */
    public function respondInternalError($message = 'Internal Server Error!', $errors = [])
    {
        $this->statusCode = Response::HTTP_INTERNAL_SERVER_ERROR;

        $this->errors = $errors;
        return $this->respondWithError($message);
    }

    /**
     * Function to return an internal error response.
     *
     * @param string $message
     * @return mixed
     */
    public function respondMethodNotAllowed($message = 'Method not allowed!')
    {
        $this->statusCode = Response::HTTP_METHOD_NOT_ALLOWED;
        return $this->respondWithError($message);
    }

    /**
     * Function to return a service unavailable response.
     *
     * @param string $message
     * @return mixed
     */
    public function respondServiceUnavailable($message = "Service Unavailable!")
    {
        $this->statusCode = Response::HTTP_SERVICE_UNAVAILABLE;
        return $this->respondWithError($message);
    }

    /**
     * Throws a bad request exception with the validator's error messages.
     *
     * @param Validator $validator The validator to get the message from
     *
     * @return mixed
     */
    public function respondValidationError(Validator $validator)
    {
        $this->error = true;
        $this->statusCode = Response::HTTP_BAD_REQUEST;
        $this->apiMessage = Response::$statusTexts[Response::HTTP_BAD_REQUEST];
        $this->errors = $validator->getMessageBag()->toArray();

        $this->respondWithError(Response::$statusTexts[Response::HTTP_BAD_REQUEST])->send();
        exit();
    }

    /**
     * Function to return a created response
     *
     * @param $data array The data to be included
     *
     * @return mixed
     *
     */
    public function respondCreated($data)
    {
        $this->statusCode = Response::HTTP_CREATED;
        return $this->respond($data);
    }

    /**
     * Function to return a response with a message
     *
     * @param $data array The data to be included
     *
     * @param $message string The message to be shown in the meta of the response
     *
     * @return mixed
     */
    public function respondWithMessage($data, $message = 'Success!')
    {
        $this->statusCode = Response::HTTP_OK;
        $this->apiMessage = $message;
        return $this->respond($data);
    }

    /**
     * Adds debugging information to the response
     *
     * @param $data
     */
    public function addDebugInfo($data)
    {
        $this->debugInfo[] = $data;
        if (config('app.debug')) {
            $this->debugInfo[] = $data;
        }
    }

    /**
     * Function to return a generic response.
     *
     * @param $data array to be used in response.
     * @param array $headers Headers to be used in response.
     * @return mixed Return the response.
     */
    public function respond($data = [], $headers = [])
    {
        $result = [
            'status' => (!$this->error),
            'message' => $this->apiMessage,
        ];

        if (!empty($data)) {
            $result['data'] = $data;
        }

        if (!empty($this->errors)) {
            $result['errors'] = $this->errors;
        }

        if (!empty($this->debugInfo)) {
            $result['debug'] = $this->debugInfo;
        }

        return response()->json($result, $this->statusCode, $headers);
    }

    /**
     * Returns a LengthAwarePaginator for an array collection
     *
     * @param Request $request
     * @param array $items
     * @return LengthAwarePaginator
     */
    public function paginate(Request $request, $items)
    {
        $limit = min(intval($request->get('limit', 10)), $this->defaultMaxLimit);
        $page = (int) $request->get('page', 1);
        $offset = ($page - 1) * $limit;
        $items = new LengthAwarePaginator(array_slice($items, $offset, $limit), count($items), $limit, $page);
        return $items;
    }

    /**
     * Responds paginated items
     *
     * @param Request $request
     * @param array|\Illuminate\Contracts\Pagination\LengthAwarePaginator $items
     *
     * @param array $options
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondPagination($request, $items, $options = [])
    {
        if (!($items instanceof LengthAwarePaginator)) {
            $pagination = $this->paginate($request, $items);
        } else {
            $pagination = $items;
        }
        return $this->respond(['pagination' => $this->getPagination($pagination), 'items' => $pagination->items(), 'options' => $options]);
    }

    /**
     * Retrieves the pagination meta in an array format
     *
     * @param LengthAwarePaginator $item
     * @return array
     */
    public function getPagination(LengthAwarePaginator $item)
    {
        return [
            'total' => $item->total(),
            'current_page' => $item->currentPage(),
            'last_page' => $item->lastPage(),
            'from' => $item->firstItem(),
            'to' => $item->lastItem()
        ];
    }

    /**
     * Function to return a datatable format response.
     *
     * @param array $data to be used in response.
     * @param int $draw to be used in response
     * @param int $total to be used in response
     * @param int $filtered to be used in response
     * @param array $headers Headers to be used in response.
     * @return mixed Return the response.
     */
    public function dataTable($data = [], $draw = 1, $total = 0, $filtered = 0, $headers = [])
    {
        $data = [
            'draw' => $draw,
            'recordsTotal' => $total,
            'recordsFiltered' => $filtered,
            'data' => $data
        ];

        if (!empty($this->debugInfo)) {
            $data['debug'] = $this->debugInfo;
        }

        return response()->json($data, $this->statusCode, $headers);
    }

    /**
     * Function to return a default redirect response.
     *
     * @param array $headers Headers to be used in response.
     * @return mixed Return the response.
     */
    public function respondRedirect($url = "", $message = "Success!", $headers = [])
    {
        return response()->json([
            "status" => true,
            "message" => $message,
            "redirect" => $url
        ], $this->statusCode, $headers);
    }

    /**
     * Override Validate the given request with the given rules.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $rules
     * @param  array  $messages
     * @param  array  $customAttributes
     * @return void
     */
    public function validation(Request $request, array $rules, array $messages = [], array $customAttributes = [])
    {
        $validator = $this->getValidationFactory()->make($request->all(), $rules, $messages, $customAttributes);

        if ($validator->fails()) {
            $this->respondValidationError($validator);
        }
    }
}
