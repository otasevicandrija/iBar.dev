<?php

namespace App\Http\Controllers;

use App\Models\Shared;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SharedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response([
            "msg" => "Hello NAV ;)"
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Shared  $shared
     * @return \Illuminate\Http\Response
     */
    public function show(Shared $shared)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Shared  $shared
     * @return \Illuminate\Http\Response
     */
    public function edit(Shared $shared)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Shared  $shared
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Shared $shared)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Shared  $shared
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shared $shared)
    {
        //
    }
}
