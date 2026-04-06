#' Create a new StepDetailToolCallsInner
#'
#' @description
#' StepDetailToolCallsInner Class
#'
#' @docType class
#' @title StepDetailToolCallsInner
#' @description StepDetailToolCallsInner Class
#' @format An \code{R6Class} generator object
#' @field name  character [optional]
#' @field input  object [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
StepDetailToolCallsInner <- R6::R6Class(
  "StepDetailToolCallsInner",
  public = list(
    `name` = NULL,
    `input` = NULL,

    #' @description
    #' Initialize a new StepDetailToolCallsInner class.
    #'
    #' @param name name
    #' @param input input
    #' @param ... Other optional arguments.
    initialize = function(`name` = NULL, `input` = NULL, ...) {
      if (!is.null(`name`)) {
        if (!(is.character(`name`) && length(`name`) == 1)) {
          stop(paste("Error! Invalid data for `name`. Must be a string:", `name`))
        }
        self$`name` <- `name`
      }
      if (!is.null(`input`)) {
        self$`input` <- `input`
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
    #' @return StepDetailToolCallsInner as a base R list.
    #' @examples
    #' # convert array of StepDetailToolCallsInner (x) to a data frame
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
    #' Convert StepDetailToolCallsInner to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      StepDetailToolCallsInnerObject <- list()
      if (!is.null(self$`name`)) {
        StepDetailToolCallsInnerObject[["name"]] <-
          self$`name`
      }
      if (!is.null(self$`input`)) {
        StepDetailToolCallsInnerObject[["input"]] <-
          self$`input`
      }
      return(StepDetailToolCallsInnerObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of StepDetailToolCallsInner
    #'
    #' @param input_json the JSON input
    #' @return the instance of StepDetailToolCallsInner
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`name`)) {
        self$`name` <- this_object$`name`
      }
      if (!is.null(this_object$`input`)) {
        self$`input` <- this_object$`input`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return StepDetailToolCallsInner in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of StepDetailToolCallsInner
    #'
    #' @param input_json the JSON input
    #' @return the instance of StepDetailToolCallsInner
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`name` <- this_object$`name`
      self$`input` <- this_object$`input`
      self
    },

    #' @description
    #' Validate JSON input with respect to StepDetailToolCallsInner and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of StepDetailToolCallsInner
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
# StepDetailToolCallsInner$unlock()
#
## Below is an example to define the print function
# StepDetailToolCallsInner$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# StepDetailToolCallsInner$lock()

