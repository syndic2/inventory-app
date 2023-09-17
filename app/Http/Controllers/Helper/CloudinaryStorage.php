<?php

namespace App\Http\Controllers\Helper;

use App\Http\Controllers\Controller;

class CloudinaryStorage extends Controller
{
    private const folder_path = 'inventory-app';

    public static function path($path)
    {
        return pathinfo($path, PATHINFO_FILENAME);
    }

    public static function upload($image, $filename)
    {
        $newFilename = str_replace(' ', '_', $filename);
        $publicId = date('Y-m-d_His') . '_' . $newFilename;
        $result = cloudinary()->upload($image, [
            "public_id" => self::path($publicId),
            "folder"    => self::folder_path
        ])->getSecurePath();

        return $result;
    }

    public static function replace($path, $image, $public_id)
    {
        self::delete($path);
        return self::upload($image, $public_id);
    }

    public static function delete($path)
    {
        $publicId = self::folder_path . '/' . self::path($path);
        return cloudinary()->destroy($publicId);
    }
}
