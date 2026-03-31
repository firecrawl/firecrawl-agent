#' Create a new ModelConfig
#'
#' @description
#' ModelConfig Class
#'
#' @docType class
#' @title ModelConfig
#' @description ModelConfig Class
#' @format An \code{R6Class} generator object
#' @field provider LLM provider. character [optional]
#' @field model Model identifier (e.g. \"gemini-3-flash-preview\", \"claude-sonnet-4-6\"). character [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
ModelConfig <- R6::R6Class(
  "ModelConfig",
  public = list(
    `provider` = NULL,
    `model` = NULL,

    #' @description
    #' Initialize a new ModelConfig class.
    #'
    #' @param provider LLM provider.
    #' @param model Model identifier (e.g. \"gemini-3-flash-preview\", \"claude-sonnet-4-6\").
    #' @param ... Other optional arguments.
    initialize = function(`provider` = NULL, `model` = NULL, ...) {
      if (!is.null(`provider`)) {
        if (!(`provider` %in% c("anthropic", "openai", "google", "gateway"))) {
          stop(paste("Error! \"", `provider`, "\" cannot be assigned to `provider`. Must be \"anthropic\", \"openai\", \"google\", \"gateway\".", sep = ""))
        }
        if (!(is.character(`provider`) && length(`provider`) == 1)) {
          stop(paste("Error! Invalid data for `provider`. Must be a string:", `provider`))
        }
        self$`provider` <- `provider`
      }
      if (!is.null(`model`)) {
        if (!(is.character(`model`) && length(`model`) == 1)) {
          stop(paste("Error! Invalid data for `model`. Must be a string:", `model`))
        }
        self$`model` <- `model`
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
    #' @return ModelConfig as a base R list.
    #' @examples
    #' # convert array of ModelConfig (x) to a data frame
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
    #' Convert ModelConfig to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      ModelConfigObject <- list()
      if (!is.null(self$`provider`)) {
        ModelConfigObject[["provider"]] <-
          self$`provider`
      }
      if (!is.null(self$`model`)) {
        ModelConfigObject[["model"]] <-
          self$`model`
      }
      return(ModelConfigObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of ModelConfig
    #'
    #' @param input_json the JSON input
    #' @return the instance of ModelConfig
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`provider`)) {
        if (!is.null(this_object$`provider`) && !(this_object$`provider` %in% c("anthropic", "openai", "google", "gateway"))) {
          stop(paste("Error! \"", this_object$`provider`, "\" cannot be assigned to `provider`. Must be \"anthropic\", \"openai\", \"google\", \"gateway\".", sep = ""))
        }
        self$`provider` <- this_object$`provider`
      }
      if (!is.null(this_object$`model`)) {
        self$`model` <- this_object$`model`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return ModelConfig in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of ModelConfig
    #'
    #' @param input_json the JSON input
    #' @return the instance of ModelConfig
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`provider`) && !(this_object$`provider` %in% c("anthropic", "openai", "google", "gateway"))) {
        stop(paste("Error! \"", this_object$`provider`, "\" cannot be assigned to `provider`. Must be \"anthropic\", \"openai\", \"google\", \"gateway\".", sep = ""))
      }
      self$`provider` <- this_object$`provider`
      self$`model` <- this_object$`model`
      self
    },

    #' @description
    #' Validate JSON input with respect to ModelConfig and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of ModelConfig
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
# ModelConfig$unlock()
#
## Below is an example to define the print function
# ModelConfig$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# ModelConfig$lock()

