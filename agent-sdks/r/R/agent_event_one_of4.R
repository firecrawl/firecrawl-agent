#' Create a new AgentEventOneOf4
#'
#' @description
#' AgentEventOneOf4 Class
#'
#' @docType class
#' @title AgentEventOneOf4
#' @description AgentEventOneOf4 Class
#' @format An \code{R6Class} generator object
#' @field type  \link{AnyType} [optional]
#' @field text  character [optional]
#' @field steps  list(\link{StepDetail}) [optional]
#' @field usage  \link{Usage} [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
AgentEventOneOf4 <- R6::R6Class(
  "AgentEventOneOf4",
  public = list(
    `type` = NULL,
    `text` = NULL,
    `steps` = NULL,
    `usage` = NULL,

    #' @description
    #' Initialize a new AgentEventOneOf4 class.
    #'
    #' @param type type
    #' @param text text
    #' @param steps steps
    #' @param usage usage
    #' @param ... Other optional arguments.
    initialize = function(`type` = NULL, `text` = NULL, `steps` = NULL, `usage` = NULL, ...) {
      if (!is.null(`type`)) {
        stopifnot(R6::is.R6(`type`))
        self$`type` <- `type`
      }
      if (!is.null(`text`)) {
        if (!(is.character(`text`) && length(`text`) == 1)) {
          stop(paste("Error! Invalid data for `text`. Must be a string:", `text`))
        }
        self$`text` <- `text`
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
    #' @return AgentEventOneOf4 as a base R list.
    #' @examples
    #' # convert array of AgentEventOneOf4 (x) to a data frame
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
    #' Convert AgentEventOneOf4 to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      AgentEventOneOf4Object <- list()
      if (!is.null(self$`type`)) {
        AgentEventOneOf4Object[["type"]] <-
          self$extractSimpleType(self$`type`)
      }
      if (!is.null(self$`text`)) {
        AgentEventOneOf4Object[["text"]] <-
          self$`text`
      }
      if (!is.null(self$`steps`)) {
        AgentEventOneOf4Object[["steps"]] <-
          self$extractSimpleType(self$`steps`)
      }
      if (!is.null(self$`usage`)) {
        AgentEventOneOf4Object[["usage"]] <-
          self$extractSimpleType(self$`usage`)
      }
      return(AgentEventOneOf4Object)
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
    #' Deserialize JSON string into an instance of AgentEventOneOf4
    #'
    #' @param input_json the JSON input
    #' @return the instance of AgentEventOneOf4
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`type`)) {
        `type_object` <- AnyType$new()
        `type_object`$fromJSON(jsonlite::toJSON(this_object$`type`, auto_unbox = TRUE, digits = NA))
        self$`type` <- `type_object`
      }
      if (!is.null(this_object$`text`)) {
        self$`text` <- this_object$`text`
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
    #' @return AgentEventOneOf4 in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of AgentEventOneOf4
    #'
    #' @param input_json the JSON input
    #' @return the instance of AgentEventOneOf4
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`type` <- AnyType$new()$fromJSON(jsonlite::toJSON(this_object$`type`, auto_unbox = TRUE, digits = NA))
      self$`text` <- this_object$`text`
      self$`steps` <- ApiClient$new()$deserializeObj(this_object$`steps`, "array[StepDetail]", loadNamespace("openapi"))
      self$`usage` <- Usage$new()$fromJSON(jsonlite::toJSON(this_object$`usage`, auto_unbox = TRUE, digits = NA))
      self
    },

    #' @description
    #' Validate JSON input with respect to AgentEventOneOf4 and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of AgentEventOneOf4
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
# AgentEventOneOf4$unlock()
#
## Below is an example to define the print function
# AgentEventOneOf4$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# AgentEventOneOf4$lock()

