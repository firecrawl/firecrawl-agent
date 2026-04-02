#' Create a new WorkerProgress
#'
#' @description
#' WorkerProgress Class
#'
#' @docType class
#' @title WorkerProgress
#' @description WorkerProgress Class
#' @format An \code{R6Class} generator object
#' @field id  character [optional]
#' @field status  character [optional]
#' @field steps  integer [optional]
#' @field currentTool  character [optional]
#' @field tokens  integer [optional]
#' @field stepLog  list(\link{WorkerProgressStepLogInner}) [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
WorkerProgress <- R6::R6Class(
  "WorkerProgress",
  public = list(
    `id` = NULL,
    `status` = NULL,
    `steps` = NULL,
    `currentTool` = NULL,
    `tokens` = NULL,
    `stepLog` = NULL,

    #' @description
    #' Initialize a new WorkerProgress class.
    #'
    #' @param id id
    #' @param status status
    #' @param steps steps
    #' @param currentTool currentTool
    #' @param tokens tokens
    #' @param stepLog stepLog
    #' @param ... Other optional arguments.
    initialize = function(`id` = NULL, `status` = NULL, `steps` = NULL, `currentTool` = NULL, `tokens` = NULL, `stepLog` = NULL, ...) {
      if (!is.null(`id`)) {
        if (!(is.character(`id`) && length(`id`) == 1)) {
          stop(paste("Error! Invalid data for `id`. Must be a string:", `id`))
        }
        self$`id` <- `id`
      }
      if (!is.null(`status`)) {
        if (!(`status` %in% c("running", "done", "error"))) {
          stop(paste("Error! \"", `status`, "\" cannot be assigned to `status`. Must be \"running\", \"done\", \"error\".", sep = ""))
        }
        if (!(is.character(`status`) && length(`status`) == 1)) {
          stop(paste("Error! Invalid data for `status`. Must be a string:", `status`))
        }
        self$`status` <- `status`
      }
      if (!is.null(`steps`)) {
        if (!(is.numeric(`steps`) && length(`steps`) == 1)) {
          stop(paste("Error! Invalid data for `steps`. Must be an integer:", `steps`))
        }
        self$`steps` <- `steps`
      }
      if (!is.null(`currentTool`)) {
        if (!(is.character(`currentTool`) && length(`currentTool`) == 1)) {
          stop(paste("Error! Invalid data for `currentTool`. Must be a string:", `currentTool`))
        }
        self$`currentTool` <- `currentTool`
      }
      if (!is.null(`tokens`)) {
        if (!(is.numeric(`tokens`) && length(`tokens`) == 1)) {
          stop(paste("Error! Invalid data for `tokens`. Must be an integer:", `tokens`))
        }
        self$`tokens` <- `tokens`
      }
      if (!is.null(`stepLog`)) {
        stopifnot(is.vector(`stepLog`), length(`stepLog`) != 0)
        sapply(`stepLog`, function(x) stopifnot(R6::is.R6(x)))
        self$`stepLog` <- `stepLog`
      }
    },

    #' @description
    #' Convert to an R object. This method is deprecated. Use `toSimpleType()` instead.
    toJSON = function() {
      .Deprecated(new = "toSimpleType", msg = "Use the '$toSimpleType()' method instead since that is more clearly named. Use '$toJSONString()' to get a JSON string")
      return(self$toSimpleType())
    },

    #' @description
    #' Convert to a List
    #'
    #' Convert the R6 object to a list to work more easily with other tooling.
    #'
    #' @return WorkerProgress as a base R list.
    #' @examples
    #' # convert array of WorkerProgress (x) to a data frame
    #' \dontrun{
    #' library(purrr)
    #' library(tibble)
    #' df <- x |> map(\(y)y$toList()) |> map(as_tibble) |> list_rbind()
    #' df
    #' }
    toList = function() {
      return(self$toSimpleType())
    },

    #' @description
    #' Convert WorkerProgress to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      WorkerProgressObject <- list()
      if (!is.null(self$`id`)) {
        WorkerProgressObject[["id"]] <-
          self$`id`
      }
      if (!is.null(self$`status`)) {
        WorkerProgressObject[["status"]] <-
          self$`status`
      }
      if (!is.null(self$`steps`)) {
        WorkerProgressObject[["steps"]] <-
          self$`steps`
      }
      if (!is.null(self$`currentTool`)) {
        WorkerProgressObject[["currentTool"]] <-
          self$`currentTool`
      }
      if (!is.null(self$`tokens`)) {
        WorkerProgressObject[["tokens"]] <-
          self$`tokens`
      }
      if (!is.null(self$`stepLog`)) {
        WorkerProgressObject[["stepLog"]] <-
          self$extractSimpleType(self$`stepLog`)
      }
      return(WorkerProgressObject)
    },

    extractSimpleType = function(x) {
      if (R6::is.R6(x)) {
        return(x$toSimpleType())
      } else if (!self$hasNestedR6(x)) {
        return(x)
      }
      lapply(x, self$extractSimpleType)
    },

    hasNestedR6 = function(x) {
      if (R6::is.R6(x)) {
        return(TRUE)
      }
      if (is.list(x)) {
        for (item in x) {
          if (self$hasNestedR6(item)) {
            return(TRUE)
          }
        }
      }
      FALSE
    },

    #' @description
    #' Deserialize JSON string into an instance of WorkerProgress
    #'
    #' @param input_json the JSON input
    #' @return the instance of WorkerProgress
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`id`)) {
        self$`id` <- this_object$`id`
      }
      if (!is.null(this_object$`status`)) {
        if (!is.null(this_object$`status`) && !(this_object$`status` %in% c("running", "done", "error"))) {
          stop(paste("Error! \"", this_object$`status`, "\" cannot be assigned to `status`. Must be \"running\", \"done\", \"error\".", sep = ""))
        }
        self$`status` <- this_object$`status`
      }
      if (!is.null(this_object$`steps`)) {
        self$`steps` <- this_object$`steps`
      }
      if (!is.null(this_object$`currentTool`)) {
        self$`currentTool` <- this_object$`currentTool`
      }
      if (!is.null(this_object$`tokens`)) {
        self$`tokens` <- this_object$`tokens`
      }
      if (!is.null(this_object$`stepLog`)) {
        self$`stepLog` <- ApiClient$new()$deserializeObj(this_object$`stepLog`, "array[WorkerProgressStepLogInner]", loadNamespace("openapi"))
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return WorkerProgress in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of WorkerProgress
    #'
    #' @param input_json the JSON input
    #' @return the instance of WorkerProgress
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`id` <- this_object$`id`
      if (!is.null(this_object$`status`) && !(this_object$`status` %in% c("running", "done", "error"))) {
        stop(paste("Error! \"", this_object$`status`, "\" cannot be assigned to `status`. Must be \"running\", \"done\", \"error\".", sep = ""))
      }
      self$`status` <- this_object$`status`
      self$`steps` <- this_object$`steps`
      self$`currentTool` <- this_object$`currentTool`
      self$`tokens` <- this_object$`tokens`
      self$`stepLog` <- ApiClient$new()$deserializeObj(this_object$`stepLog`, "array[WorkerProgressStepLogInner]", loadNamespace("openapi"))
      self
    },

    #' @description
    #' Validate JSON input with respect to WorkerProgress and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of WorkerProgress
    toString = function() {
      self$toJSONString()
    },

    #' @description
    #' Return true if the values in all fields are valid.
    #'
    #' @return true if the values in all fields are valid.
    isValid = function() {
      TRUE
    },

    #' @description
    #' Return a list of invalid fields (if any).
    #'
    #' @return A list of invalid fields (if any).
    getInvalidFields = function() {
      invalid_fields <- list()
      invalid_fields
    },

    #' @description
    #' Print the object
    print = function() {
      print(jsonlite::prettify(self$toJSONString()))
      invisible(self)
    }
  ),
  # Lock the class to prevent modifications to the method or field
  lock_class = TRUE
)
## Uncomment below to unlock the class to allow modifications of the method or field
# WorkerProgress$unlock()
#
## Below is an example to define the print function
# WorkerProgress$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# WorkerProgress$lock()

