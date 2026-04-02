#' Create a new Usage
#'
#' @description
#' Usage Class
#'
#' @docType class
#' @title Usage
#' @description Usage Class
#' @format An \code{R6Class} generator object
#' @field inputTokens  integer [optional]
#' @field outputTokens  integer [optional]
#' @field totalTokens  integer [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
Usage <- R6::R6Class(
  "Usage",
  public = list(
    `inputTokens` = NULL,
    `outputTokens` = NULL,
    `totalTokens` = NULL,

    #' @description
    #' Initialize a new Usage class.
    #'
    #' @param inputTokens inputTokens
    #' @param outputTokens outputTokens
    #' @param totalTokens totalTokens
    #' @param ... Other optional arguments.
    initialize = function(`inputTokens` = NULL, `outputTokens` = NULL, `totalTokens` = NULL, ...) {
      if (!is.null(`inputTokens`)) {
        if (!(is.numeric(`inputTokens`) && length(`inputTokens`) == 1)) {
          stop(paste("Error! Invalid data for `inputTokens`. Must be an integer:", `inputTokens`))
        }
        self$`inputTokens` <- `inputTokens`
      }
      if (!is.null(`outputTokens`)) {
        if (!(is.numeric(`outputTokens`) && length(`outputTokens`) == 1)) {
          stop(paste("Error! Invalid data for `outputTokens`. Must be an integer:", `outputTokens`))
        }
        self$`outputTokens` <- `outputTokens`
      }
      if (!is.null(`totalTokens`)) {
        if (!(is.numeric(`totalTokens`) && length(`totalTokens`) == 1)) {
          stop(paste("Error! Invalid data for `totalTokens`. Must be an integer:", `totalTokens`))
        }
        self$`totalTokens` <- `totalTokens`
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
    #' @return Usage as a base R list.
    #' @examples
    #' # convert array of Usage (x) to a data frame
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
    #' Convert Usage to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      UsageObject <- list()
      if (!is.null(self$`inputTokens`)) {
        UsageObject[["inputTokens"]] <-
          self$`inputTokens`
      }
      if (!is.null(self$`outputTokens`)) {
        UsageObject[["outputTokens"]] <-
          self$`outputTokens`
      }
      if (!is.null(self$`totalTokens`)) {
        UsageObject[["totalTokens"]] <-
          self$`totalTokens`
      }
      return(UsageObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of Usage
    #'
    #' @param input_json the JSON input
    #' @return the instance of Usage
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`inputTokens`)) {
        self$`inputTokens` <- this_object$`inputTokens`
      }
      if (!is.null(this_object$`outputTokens`)) {
        self$`outputTokens` <- this_object$`outputTokens`
      }
      if (!is.null(this_object$`totalTokens`)) {
        self$`totalTokens` <- this_object$`totalTokens`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return Usage in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of Usage
    #'
    #' @param input_json the JSON input
    #' @return the instance of Usage
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`inputTokens` <- this_object$`inputTokens`
      self$`outputTokens` <- this_object$`outputTokens`
      self$`totalTokens` <- this_object$`totalTokens`
      self
    },

    #' @description
    #' Validate JSON input with respect to Usage and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of Usage
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
# Usage$unlock()
#
## Below is an example to define the print function
# Usage$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# Usage$lock()

