<?php

namespace App\Http\Controllers;

use App\Exports\InventoriesExport;
use App\Http\Requests\InventroyRequest;
use App\KategoriBarang;
use App\Models\TableInventory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;

class InventoryController extends Controller
{
    protected $kategori_barang;

    public function __construct()
    {
        $this->kategori_barang = collect(KategoriBarang::cases())->map(fn($enum) => [
            'id' => $enum->value,
            'nama' => $enum->name,
        ]);
    }

    public function index(Request $request) : Response {
        $req = $request->input('refSelected', '');
        $search = $request->input('search', '');
        $query = TableInventory::query();

        if ($req !== '' && $req !== null) {
            $query->where("kategori_barang", $req);
        }

        if ($search !== '') {
            $query->where("nama_barang", 'like', '%' . $search . '%');
        }

        $res = $query->get();
        return Inertia::render("Inventory/List", [
            'data' => $res,
            'kategori_barang' => $this->kategori_barang,
        ]);
    }

    public function form($id) : Response {
        $data = ($id === 0) ? null : TableInventory::find($id);

        return Inertia::render("Inventory/Form", [
            'kategori_barang' => $this->kategori_barang,
            'result' => $data
        ]);
    }

    public function store(InventroyRequest $request, $id) : JsonResponse {
        $data = $request->validated();

        if ($id === "0") {
            TableInventory::create($data);
            $message = "Data Inventory Telah di buat.";
        } else {
            $find = TableInventory::find($id);
            $find->update($data);

            $message = "Data Inventory Sudah di update.";
        }
        return response()->json(['message' => $message]);
    }

    public function delete($id) : JsonResponse {
        $data = TableInventory::find($id);

        $data->delete();
        return response()->json(['message' => 'Data Successfully Deleted']);
    }

    public function export() {
        $fileName = 'data-inventaris_' . now()->format('Y_m_d') . '.csv';
        return Excel::download(new InventoriesExport, $fileName);
    }
}
