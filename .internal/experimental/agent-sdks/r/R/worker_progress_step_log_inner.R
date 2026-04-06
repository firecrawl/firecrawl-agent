#' Create a new WorkerProgressStepLogInner
#'
#' @description
#' WorkerProgressStepLogInner Class
#'
#' @docType class
#' @title WorkerProgressStepLogInner
#' @description WorkerProgressStepLogInner Class
#' @format An \code{R6Class} generator object
#' @field tool  character [optional]
#' @field detail  character [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
WorkerProgressStepLogInner <- R6::R6Class(
  "WorkerProgressStepLogInner",
  public = list(
    `tool` = NULL,
    `detail` = NULL,

    #' @description
    #' Initialize a new WorkerProgressStepLogInner class.
    #'
    #' @param tool tool
    #' @param detail detail
    #' @param ... Other optional arguments.
    initialize = function(`tool` = NULL, `detail` = NULL, ...) {
      if (!is.null(`tool`)) {
        if (!(is.character(`tool`) && length(`tool`) == 1)) {
          stop(paste("Error! Invalid data for `tool`. Must be a string:", `tool`))
        }
        self$`tool` <- `tool`
      }
      if (!is.null(`detail`)) {
        if (!(is.character(`detail`) && length(`detail`) == 1)) {
          stop(paste("Error! Invalid data for `detail`. Must be a string:", `detail`))
        }
        self$`detail` <- `detail`
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
    #' @return WorkerProgressStepLogInner as a base R list.
    #' @examples
    #' # convert array of WorkerProgressStepLogInner (x) to a data frame
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
    #' Convert WorkerProgressStepLogInner to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      WorkerProgressStepLogInnerObject <- list()
      if (!is.null(self$`tool`)) {
        WorkerProgressStepLogInnerObject[["tool"]] <-
          self$`tool`
      }
      if (!is.null(self$`detail`)) {
        WorkerProgressStepLogInnerObject[["detail"]] <-
          self$`detail`
      }
      return(WorkerProgressStepLogInnerObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of WorkerProgressStepLogInner
    #'
    #' @param input_json the JSON input
    #' @return the instance of WorkerProgressStepLogInner
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`tool`)) {
        self$`tool` <- this_object$`tool`
      }
      if (!is.null(this_object$`detail`)) {
        self$`detail` <- this_object$`detail`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return WorkerProgressStepLogInner in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of WorkerProgressStepLogInner
    #'
    #' @param input_json the JSON input
    #' @return the instance of WorkerProgressStepLogInner
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`tool` <- this_object$`tool`
      self$`detail` <- this_object$`detail`
      self
    },

    #' @description
    #' Validate JSON input with respect to WorkerProgressStepLogInner and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of WorkerProgressStepLogInner
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
# WorkerProgressStepLogInner$unlock()
#
## Below is an example to define the print function
# WorkerProgressStepLogInner$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# WorkerProgressStepLogInner$lock()

