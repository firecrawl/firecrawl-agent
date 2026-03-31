#' Create a new RunResponse
#'
#' @description
#' RunResponse Class
#'
#' @docType class
#' @title RunResponse
#' @description RunResponse Class
#' @format An \code{R6Class} generator object
#' @field text The agent's final text response. character [optional]
#' @field data Formatted output (present when format was specified). character [optional]
#' @field format The format of the data field. character [optional]
#' @field steps  list(\link{StepDetail}) [optional]
#' @field usage  \link{Usage} [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
RunResponse <- R6::R6Class(
  "RunResponse",
  public = list(
    `text` = NULL,
    `data` = NULL,
    `format` = NULL,
    `steps` = NULL,
    `usage` = NULL,

    #' @description
    #' Initialize a new RunResponse class.
    #'
    #' @param text The agent's final text response.
    #' @param data Formatted output (present when format was specified).
    #' @param format The format of the data field.
    #' @param steps steps
    #' @param usage usage
    #' @param ... Other optional arguments.
    initialize = function(`text` = NULL, `data` = NULL, `format` = NULL, `steps` = NULL, `usage` = NULL, ...) {
      if (!is.null(`text`)) {
        if (!(is.character(`text`) && length(`text`) == 1)) {
          stop(paste("Error! Invalid data for `text`. Must be a string:", `text`))
        }
        self$`text` <- `text`
      }
      if (!is.null(`data`)) {
        if (!(is.character(`data`) && length(`data`) == 1)) {
          stop(paste("Error! Invalid data for `data`. Must be a string:", `data`))
        }
        self$`data` <- `data`
      }
      if (!is.null(`format`)) {
        if (!(`format` %in% c("json", "csv", "markdown", "text"))) {
          stop(paste("Error! \"", `format`, "\" cannot be assigned to `format`. Must be \"json\", \"csv\", \"markdown\", \"text\".", sep = ""))
        }
        if (!(is.character(`format`) && length(`format`) == 1)) {
          stop(paste("Error! Invalid data for `format`. Must be a string:", `format`))
        }
        self$`format` <- `format`
      }
      if (!is.null(`steps`)) {
        stopifnot(is.vector(`steps`), length(`steps`) != 0)
        sapply(`steps`, function(x) stopifnot(R6::is.R6(x)))
        self$`steps` <- `steps`
      }
      if (!is.null(`usage`)) {
        stopifnot(R6::is.R6(`usage`))
        self$`usage` <- `usage`
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
    #' @return RunResponse as a base R list.
    #' @examples
    #' # convert array of RunResponse (x) to a data frame
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
    #' Convert RunResponse to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      RunResponseObject <- list()
      if (!is.null(self$`text`)) {
        RunResponseObject[["text"]] <-
          self$`text`
      }
      if (!is.null(self$`data`)) {
        RunResponseObject[["data"]] <-
          self$`data`
      }
      if (!is.null(self$`format`)) {
        RunResponseObject[["format"]] <-
          self$`format`
      }
      if (!is.null(self$`steps`)) {
        RunResponseObject[["steps"]] <-
          self$extractSimpleType(self$`steps`)
      }
      if (!is.null(self$`usage`)) {
        RunResponseObject[["usage"]] <-
          self$extractSimpleType(self$`usage`)
      }
      return(RunResponseObject)
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
    #' Deserialize JSON string into an instance of RunResponse
    #'
    #' @param input_json the JSON input
    #' @return the instance of RunResponse
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`text`)) {
        self$`text` <- this_object$`text`
      }
      if (!is.null(this_object$`data`)) {
        self$`data` <- this_object$`data`
      }
      if (!is.null(this_object$`format`)) {
        if (!is.null(this_object$`format`) && !(this_object$`format` %in% c("json", "csv", "markdown", "text"))) {
          stop(paste("Error! \"", this_object$`format`, "\" cannot be assigned to `format`. Must be \"json\", \"csv\", \"markdown\", \"text\".", sep = ""))
        }
        self$`format` <- this_object$`format`
      }
      if (!is.null(this_object$`steps`)) {
        self$`steps` <- ApiClient$new()$deserializeObj(this_object$`steps`, "array[StepDetail]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`usage`)) {
        `usage_object` <- Usage$new()
        `usage_object`$fromJSON(jsonlite::toJSON(this_object$`usage`, auto_unbox = TRUE, digits = NA))
        self$`usage` <- `usage_object`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return RunResponse in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of RunResponse
    #'
    #' @param input_json the JSON input
    #' @return the instance of RunResponse
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`text` <- this_object$`text`
      self$`data` <- this_object$`data`
      if (!is.null(this_object$`format`) && !(this_object$`format` %in% c("json", "csv", "markdown", "text"))) {
        stop(paste("Error! \"", this_object$`format`, "\" cannot be assigned to `format`. Must be \"json\", \"csv\", \"markdown\", \"text\".", sep = ""))
      }
      self$`format` <- this_object$`format`
      self$`steps` <- ApiClient$new()$deserializeObj(this_object$`steps`, "array[StepDetail]", loadNamespace("openapi"))
      self$`usage` <- Usage$new()$fromJSON(jsonlite::toJSON(this_object$`usage`, auto_unbox = TRUE, digits = NA))
      self
    },

    #' @description
    #' Validate JSON input with respect to RunResponse and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of RunResponse
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
# RunResponse$unlock()
#
## Below is an example to define the print function
# RunResponse$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# RunResponse$lock()

