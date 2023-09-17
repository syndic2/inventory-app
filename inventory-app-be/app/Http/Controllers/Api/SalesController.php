<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use App\Models\Sales;

class SalesController extends Controller
{
    public function index()
    {
        try {
            $result = Sales::orderBy('sale_date_time', 'asc')->paginate(10);
        } catch (Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => null
            ], 500);
        }

        return response([
            'status' => true,
            'message' => null,
            'data' => $result
        ]);
    }
}
