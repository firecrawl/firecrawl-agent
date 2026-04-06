#' Create a new ErrorResponse
#'
#' @description
#' ErrorResponse Class
#'
#' @docType class
#' @title ErrorResponse
#' @description ErrorResponse Class
#' @format An \code{R6Class} generator object
#' @field error  character [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
ErrorResponse <- R6::R6Class(
  "ErrorResponse",
  public = list(
    `error` = NULL,

    #' @description
    #' Initialize a new ErrorResponse class.
    #'
    #' @param error error
    #' @param ... Other optional arguments.
    initialize = function(`error` = NULL, ...) {
      if (!is.null(`error`)) {
        if (!(is.character(`error`) && length(`error`) == 1)) {
          stop(paste("Error! Invalid data for `error`. Must be a string:", `error`))
        }
        self$`error` <- `error`
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
    #' @return ErrorResponse as a base R list.
    #' @examples
    #' # convert array of ErrorResponse (x) to a data frame
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
    #' Convert ErrorResponse to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      ErrorResponseObject <- list()
      if (!is.null(self$`error`)) {
        ErrorResponseObject[["error"]] <-
          self$`error`
      }
      return(ErrorResponseObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of ErrorResponse
    #'
    #' @param input_json the JSON input
    #' @return the instance of ErrorResponse
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`error`)) {
        self$`error` <- this_object$`error`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return ErrorResponse in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of ErrorResponse
    #'
    #' @param input_json the JSON input
    #' @return the instance of ErrorResponse
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`error` <- this_object$`error`
      self
    },

    #' @description
    #' Validate JSON input with respect to ErrorResponse and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of ErrorResponse
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
# ErrorResponse$unlock()
#
## Below is an example to define the print function
# ErrorResponse$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# ErrorResponse$lock()

