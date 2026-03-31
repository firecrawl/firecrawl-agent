#' Create a new StepDetail
#'
#' @description
#' StepDetail Class
#'
#' @docType class
#' @title StepDetail
#' @description StepDetail Class
#' @format An \code{R6Class} generator object
#' @field text  character [optional]
#' @field toolCalls  list(\link{StepDetailToolCallsInner}) [optional]
#' @field toolResults  list(\link{StepDetailToolResultsInner}) [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
StepDetail <- R6::R6Class(
  "StepDetail",
  public = list(
    `text` = NULL,
    `toolCalls` = NULL,
    `toolResults` = NULL,

    #' @description
    #' Initialize a new StepDetail class.
    #'
    #' @param text text
    #' @param toolCalls toolCalls
    #' @param toolResults toolResults
    #' @param ... Other optional arguments.
    initialize = function(`text` = NULL, `toolCalls` = NULL, `toolResults` = NULL, ...) {
      if (!is.null(`text`)) {
        if (!(is.character(`text`) && length(`text`) == 1)) {
          stop(paste("Error! Invalid data for `text`. Must be a string:", `text`))
        }
        self$`text` <- `text`
      }
      if (!is.null(`toolCalls`)) {
        stopifnot(is.vector(`toolCalls`), length(`toolCalls`) != 0)
        sapply(`toolCalls`, function(x) stopifnot(R6::is.R6(x)))
        self$`toolCalls` <- `toolCalls`
      }
      if (!is.null(`toolResults`)) {
        stopifnot(is.vector(`toolResults`), length(`toolResults`) != 0)
        sapply(`toolResults`, function(x) stopifnot(R6::is.R6(x)))
        self$`toolResults` <- `toolResults`
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
    #' @return StepDetail as a base R list.
    #' @examples
    #' # convert array of StepDetail (x) to a data frame
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
    #' Convert StepDetail to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      StepDetailObject <- list()
      if (!is.null(self$`text`)) {
        StepDetailObject[["text"]] <-
          self$`text`
      }
      if (!is.null(self$`toolCalls`)) {
        StepDetailObject[["toolCalls"]] <-
          self$extractSimpleType(self$`toolCalls`)
      }
      if (!is.null(self$`toolResults`)) {
        StepDetailObject[["toolResults"]] <-
          self$extractSimpleType(self$`toolResults`)
      }
      return(StepDetailObject)
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
    #' Deserialize JSON string into an instance of StepDetail
    #'
    #' @param input_json the JSON input
    #' @return the instance of StepDetail
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`text`)) {
        self$`text` <- this_object$`text`
      }
      if (!is.null(this_object$`toolCalls`)) {
        self$`toolCalls` <- ApiClient$new()$deserializeObj(this_object$`toolCalls`, "array[StepDetailToolCallsInner]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`toolResults`)) {
        self$`toolResults` <- ApiClient$new()$deserializeObj(this_object$`toolResults`, "array[StepDetailToolResultsInner]", loadNamespace("openapi"))
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return StepDetail in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of StepDetail
    #'
    #' @param input_json the JSON input
    #' @return the instance of StepDetail
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`text` <- this_object$`text`
      self$`toolCalls` <- ApiClient$new()$deserializeObj(this_object$`toolCalls`, "array[StepDetailToolCallsInner]", loadNamespace("openapi"))
      self$`toolResults` <- ApiClient$new()$deserializeObj(this_object$`toolResults`, "array[StepDetailToolResultsInner]", loadNamespace("openapi"))
      self
    },

    #' @description
    #' Validate JSON input with respect to StepDetail and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of StepDetail
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
# StepDetail$unlock()
#
## Below is an example to define the print function
# StepDetail$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# StepDetail$lock()

