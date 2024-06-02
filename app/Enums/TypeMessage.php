<?php

namespace App\Enums;

enum TypeMessage: string
{
    case ERROR = "danger";
    case SUCCESS = "success";
    case WARNING = "warning";
    case INFO = "primary";
}
