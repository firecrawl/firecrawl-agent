#' Create a new StepDetailToolResultsInner
#'
#' @description
#' StepDetailToolResultsInner Class
#'
#' @docType class
#' @title StepDetailToolResultsInner
#' @description StepDetailToolResultsInner Class
#' @format An \code{R6Class} generator object
#' @field name  character [optional]
#' @field output  object [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
StepDetailToolResultsInner <- R6::R6Class(
  "StepDetailToolResultsInner",
  public = list(
    `name` = NULL,
    `output` = NULL,

    #' @description
    #' Initialize a new StepDetailToolResultsInner class.
    #'
    #' @param name name
    #' @param output output
    #' @param ... Other optional arguments.
    initialize = function(`name` = NULL, `output` = NULL, ...) {
      if (!is.null(`name`)) {
        if (!(is.character(`name`) && length(`name`) == 1)) {
          stop(paste("Error! Invalid data for `name`. Must be a string:", `name`))
        }
        self$`name` <- `name`
      }
      if (!is.null(`output`)) {
        self$`output` <- `output`
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
    #' @return StepDetailToolResultsInner as a base R list.
    #' @examples
    #' # convert array of StepDetailToolResultsInner (x) to a data frame
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
    #' Convert StepDetailToolResultsInner to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      StepDetailToolResultsInnerObject <- list()
      if (!is.null(self$`name`)) {
        StepDetailToolResultsInnerObject[["name"]] <-
          self$`name`
      }
      if (!is.null(self$`output`)) {
        StepDetailToolResultsInnerObject[["output"]] <-
          self$`output`
      }
      return(StepDetailToolResultsInnerObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of StepDetailToolResultsInner
    #'
    #' @param input_json the JSON input
    #' @return the instance of StepDetailToolResultsInner
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`name`)) {
        self$`name` <- this_object$`name`
      }
      if (!is.null(this_object$`output`)) {
        self$`output` <- this_object$`output`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return StepDetailToolResultsInner in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of StepDetailToolResultsInner
    #'
    #' @param input_json the JSON input
    #' @return the instance of StepDetailToolResultsInner
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`name` <- this_object$`name`
      self$`output` <- this_object$`output`
      self
    },

    #' @description
    #' Validate JSON input with respect to StepDetailToolResultsInner and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of StepDetailToolResultsInner
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
# StepDetailToolResultsInner$unlock()
#
## Below is an example to define the print function
# StepDetailToolResultsInner$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# StepDetailToolResultsInner$lock()

