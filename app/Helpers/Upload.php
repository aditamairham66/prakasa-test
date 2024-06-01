<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class Upload
{
    static function storeAs($name, $path, $withPath = "Yes", $type = null, $disk = "upload")
    {
        if (request()->hasFile($name)) {
            $fileName = request()->file($name)->getClientOriginalName();
            $fileName = pathinfo($fileName, PATHINFO_FILENAME);
            $fileExt = request()->file($name)->getClientOriginalExtension();

            if ($type == "name") {
                $nameFile = Str::slug($fileName).".$fileExt";
            } else if ($type == "date") {
                $nameFile = date('Ymdhis').".$fileExt";
            } else {
                $nameFile = Str::slug($fileName)."_".date('Ymd').".$fileExt";
            }

            $path = "uploads/$path";
            $file = request()->file($name)->storeAs($path, $nameFile, $disk);
            if($file) {
                if (in_array($fileExt, ['png', 'jpg', 'jpeg'])) {
                    if (!file_exists(storage_path("app/$path/compressed"))) { // Verify if the directory exists
                        mkdir(storage_path("app/$path/compressed")); // create it if do not exists
                    }

                    $destinationPath = storage_path("app/$path/compressed");
                    $img = Image::make(storage_path("app/$file"));
                    $img->resize(300, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($destinationPath . $nameFile);
                }

                if ($withPath == "Yes") {
                    return $path."/".$nameFile;
                } else {
                    return $nameFile;
                }
            } else {
                return "";
            }
        }

        return "";
    }

    static function store($name, $path, $disk = "upload")
    {
        if (request()->hasFile($name)) {
            $file = request()->file($name);
            $fileName = $file->getClientOriginalName();
            $fileName = pathinfo($fileName, PATHINFO_FILENAME);
            $fileExt = $file->getClientOriginalExtension();

            $nameFile = Str::slug($fileName).".$fileExt";

            $path = "uploads/$path";
            $file = request()->file($name)->store($path, $disk);

            if($file) {
                if (in_array($fileExt, ['png', 'jpg', 'jpeg'])) {
                    if (!file_exists(storage_path("app/$path/compressed"))) { // Verify if the directory exists
                        mkdir(storage_path("app/$path/compressed")); // create it if do not exists
                    }

                    $destinationPath = storage_path("app/$path/compressed/");
                    $img = Image::make(storage_path("app/$file"));
                    $img->resize(300, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($destinationPath . $nameFile);
                }

                return $file;
            } else {
                return "";
            }
        }

        return "";
    }

    static function move($name, $path, $withPath = "Yes", $type = null)
    {
        if (request()->hasFile($name)) {
            $file = request()->file($name);
            $fileName = $file->getClientOriginalName();
            $fileName = pathinfo($fileName, PATHINFO_FILENAME);
            $fileExt = $file->getClientOriginalExtension();

            if ($type == "name") {
                $nameFile = Str::slug($fileName).".$fileExt";
            } else if ($type == "date") {
                $nameFile = date('Ymdhis').".$fileExt";
            } else {
                $nameFile = Str::slug($fileName)."_".date('Ymd').".$fileExt";
            }

            if (!file_exists(storage_path("app/uploads"))) { // Verify if the directory exists
                mkdir(storage_path("app/uploads")); // create it if do not exists
            }

            $path = "uploads/$path";
            if (!file_exists(storage_path("app/$path"))) { // Verify if the directory exists
                mkdir(storage_path("app/$path")); // create it if do not exists
            }
            if (!file_exists(storage_path("app/$path/compressed"))) { // Verify if the directory exists
                mkdir(storage_path("app/$path/compressed")); // create it if do not exists
            }

            if($file->move(storage_path("app/$path"), $nameFile)) {
                if (in_array($fileExt, ['png', 'jpg', 'jpeg'])) {
                    $destinationPath = storage_path("app/$path/compressed/");
                    $img = Image::make(storage_path("app/$path/" . $nameFile));
                    $img->resize(300, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($destinationPath . $nameFile);
                }

                if ($withPath == "Yes") {
                    return $path."/".$nameFile;
                } else {
                    return $nameFile;
                }
            } else {
                return "";
            }
        }

        return "";
    }

    static function uploadBase64($base64, $path, $withName = "Yes", $type = "uuid", $disk = "upload")
    {
        $mimeType = mime_content_type($base64); // Get MIME type of the file
        $extension = explode('/', $mimeType)[1]; // Get file extension from MIME type
        if ($type == "uuid") {
            $fileName = Str::uuid() . '.' . $extension; // Generate unique file name
        } else {
            $fileName = strtotime(date('Y-m-d H:i:s.u')) . '.' . $extension; // Generate unique file name
        }
        $fileContents = base64_decode(preg_replace('#^data:' . $mimeType . ';base64,#i', '', $base64)); // Extract file contents from base64 string

        $path = "uploads/$path";
        if (!file_exists(storage_path("app/$path"))) {
            mkdir(storage_path("app/$path")); // Create the base directory if it doesn't exist
        }

        if ($withName == "Yes") {
            Storage::disk($disk)->put("$path/$fileName", $fileContents); // Save file to disk
        } else {
            Storage::disk($disk)->putFileAs($path, $fileContents, $fileName); // Save file to disk with a custom filename
        }

        if (in_array($extension, ['png', 'jpg', 'jpeg'])) {
            if (!file_exists(storage_path("app/$path/compressed"))) { // Verify if the directory exists
                mkdir(storage_path("app/$path/compressed")); // create it if do not exists
            }

            $destinationPath = storage_path("app/$path/compressed/");
            $img = Image::make(storage_path("app/$path/" . $fileName));
            $img->resize(300, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save($destinationPath . $fileName);
        }

        return "$path/$fileName";
    }

    static function remove($path)
    {
        $res = false;

        $filePublic = public_path($path);
        $fileStorage = storage_path("app/$path");

        if (file_exists($filePublic)) {
            if (!unlink($filePublic)) {
                $res = false;
            } else {
                $res = true;
            }
        } else if (file_exists($fileStorage)) {
            if (!unlink($fileStorage)) {
                $res = false;
            } else {
                $res = true;
            }
        }

        return $res;
    }

    static function exists($path)
    {
        $res = false;

        $filePublic = public_path($path);
        $fileStorage = storage_path("app/$path");

        if (file_exists($filePublic)) {
            $res = true;
        } else if (file_exists($fileStorage)) {
            $res = true;
        }

        return $res;
    }

}
