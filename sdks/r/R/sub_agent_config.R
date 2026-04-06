#' Create a new SubAgentConfig
#'
#' @description
#' SubAgentConfig Class
#'
#' @docType class
#' @title SubAgentConfig
#' @description SubAgentConfig Class
#' @format An \code{R6Class} generator object
#' @field id Unique identifier for this sub-agent (used as the tool name suffix). character
#' @field name Human-readable name shown in the tool description. character
#' @field description What this sub-agent does. Included in the tool description for the orchestrator. character
#' @field instructions Custom instructions appended to the sub-agent's system prompt. character [optional]
#' @field model  \link{ModelConfig} [optional]
#' @field tools Firecrawl tools available to this sub-agent. list(character) [optional]
#' @field skills Skills to pre-load for this sub-agent. list(character) [optional]
#' @field maxSteps Maximum steps before the sub-agent stops. integer [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
SubAgentConfig <- R6::R6Class(
  "SubAgentConfig",
  public = list(
    `id` = NULL,
    `name` = NULL,
    `description` = NULL,
    `instructions` = NULL,
    `model` = NULL,
    `tools` = NULL,
    `skills` = NULL,
    `maxSteps` = NULL,

    #' @description
    #' Initialize a new SubAgentConfig class.
    #'
    #' @param id Unique identifier for this sub-agent (used as the tool name suffix).
    #' @param name Human-readable name shown in the tool description.
    #' @param description What this sub-agent does. Included in the tool description for the orchestrator.
    #' @param instructions Custom instructions appended to the sub-agent's system prompt.
    #' @param model model
    #' @param tools Firecrawl tools available to this sub-agent.
    #' @param skills Skills to pre-load for this sub-agent.
    #' @param maxSteps Maximum steps before the sub-agent stops.. Default to 10.
    #' @param ... Other optional arguments.
    initialize = function(`id`, `name`, `description`, `instructions` = NULL, `model` = NULL, `tools` = NULL, `skills` = NULL, `maxSteps` = 10, ...) {
      if (!missing(`id`)) {
        if (!(is.character(`id`) && length(`id`) == 1)) {
          stop(paste("Error! Invalid data for `id`. Must be a string:", `id`))
        }
        self$`id` <- `id`
      }
      if (!missing(`name`)) {
        if (!(is.character(`name`) && length(`name`) == 1)) {
          stop(paste("Error! Invalid data for `name`. Must be a string:", `name`))
        }
        self$`name` <- `name`
      }
      if (!missing(`description`)) {
        if (!(is.character(`description`) && length(`description`) == 1)) {
          stop(paste("Error! Invalid data for `description`. Must be a string:", `description`))
        }
        self$`description` <- `description`
      }
      if (!is.null(`instructions`)) {
        if (!(is.character(`instructions`) && length(`instructions`) == 1)) {
          stop(paste("Error! Invalid data for `instructions`. Must be a string:", `instructions`))
        }
        self$`instructions` <- `instructions`
      }
      if (!is.null(`model`)) {
        stopifnot(R6::is.R6(`model`))
        self$`model` <- `model`
      }
      if (!is.null(`tools`)) {
        stopifnot(is.vector(`tools`), length(`tools`) != 0)
        sapply(`tools`, function(x) stopifnot(is.character(x)))
        self$`tools` <- `tools`
      }
      if (!is.null(`skills`)) {
        stopifnot(is.vector(`skills`), length(`skills`) != 0)
        sapply(`skills`, function(x) stopifnot(is.character(x)))
        self$`skills` <- `skills`
      }
      if (!is.null(`maxSteps`)) {
        if (!(is.numeric(`maxSteps`) && length(`maxSteps`) == 1)) {
          stop(paste("Error! Invalid data for `maxSteps`. Must be an integer:", `maxSteps`))
        }
        self$`maxSteps` <- `maxSteps`
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
    #' @return SubAgentConfig as a base R list.
    #' @examples
    #' # convert array of SubAgentConfig (x) to a data frame
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
    #' Convert SubAgentConfig to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      SubAgentConfigObject <- list()
      if (!is.null(self$`id`)) {
        SubAgentConfigObject[["id"]] <-
          self$`id`
      }
      if (!is.null(self$`name`)) {
        SubAgentConfigObject[["name"]] <-
          self$`name`
      }
      if (!is.null(self$`description`)) {
        SubAgentConfigObject[["description"]] <-
          self$`description`
      }
      if (!is.null(self$`instructions`)) {
        SubAgentConfigObject[["instructions"]] <-
          self$`instructions`
      }
      if (!is.null(self$`model`)) {
        SubAgentConfigObject[["model"]] <-
          self$extractSimpleType(self$`model`)
      }
      if (!is.null(self$`tools`)) {
        SubAgentConfigObject[["tools"]] <-
          self$`tools`
      }
      if (!is.null(self$`skills`)) {
        SubAgentConfigObject[["skills"]] <-
          self$`skills`
      }
      if (!is.null(self$`maxSteps`)) {
        SubAgentConfigObject[["maxSteps"]] <-
          self$`maxSteps`
      }
      return(SubAgentConfigObject)
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
    #' Deserialize JSON string into an instance of SubAgentConfig
    #'
    #' @param input_json the JSON input
    #' @return the instance of SubAgentConfig
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`id`)) {
        self$`id` <- this_object$`id`
      }
      if (!is.null(this_object$`name`)) {
        self$`name` <- this_object$`name`
      }
      if (!is.null(this_object$`description`)) {
        self$`description` <- this_object$`description`
      }
      if (!is.null(this_object$`instructions`)) {
        self$`instructions` <- this_object$`instructions`
      }
      if (!is.null(this_object$`model`)) {
        `model_object` <- ModelConfig$new()
        `model_object`$fromJSON(jsonlite::toJSON(this_object$`model`, auto_unbox = TRUE, digits = NA))
        self$`model` <- `model_object`
      }
      if (!is.null(this_object$`tools`)) {
        self$`tools` <- ApiClient$new()$deserializeObj(this_object$`tools`, "array[character]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`skills`)) {
        self$`skills` <- ApiClient$new()$deserializeObj(this_object$`skills`, "array[character]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`maxSteps`)) {
        self$`maxSteps` <- this_object$`maxSteps`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return SubAgentConfig in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of SubAgentConfig
    #'
    #' @param input_json the JSON input
    #' @return the instance of SubAgentConfig
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`id` <- this_object$`id`
      self$`name` <- this_object$`name`
      self$`description` <- this_object$`description`
      self$`instructions` <- this_object$`instructions`
      self$`model` <- ModelConfig$new()$fromJSON(jsonlite::toJSON(this_object$`model`, auto_unbox = TRUE, digits = NA))
      self$`tools` <- ApiClient$new()$deserializeObj(this_object$`tools`, "array[character]", loadNamespace("openapi"))
      self$`skills` <- ApiClient$new()$deserializeObj(this_object$`skills`, "array[character]", loadNamespace("openapi"))
      self$`maxSteps` <- this_object$`maxSteps`
      self
    },

    #' @description
    #' Validate JSON input with respect to SubAgentConfig and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
      # check the required field `id`
      if (!is.null(input_json$`id`)) {
        if (!(is.character(input_json$`id`) && length(input_json$`id`) == 1)) {
          stop(paste("Error! Invalid data for `id`. Must be a string:", input_json$`id`))
        }
      } else {
        stop(paste("The JSON input `", input, "` is invalid for SubAgentConfig: the required field `id` is missing."))
      }
      # check the required field `name`
      if (!is.null(input_json$`name`)) {
        if (!(is.character(input_json$`name`) && length(input_json$`name`) == 1)) {
          stop(paste("Error! Invalid data for `name`. Must be a string:", input_json$`name`))
        }
      } else {
        stop(paste("The JSON input `", input, "` is invalid for SubAgentConfig: the required field `name` is missing."))
      }
      # check the required field `description`
      if (!is.null(input_json$`description`)) {
        if (!(is.character(input_json$`description`) && length(input_json$`description`) == 1)) {
          stop(paste("Error! Invalid data for `description`. Must be a string:", input_json$`description`))
        }
      } else {
        stop(paste("The JSON input `", input, "` is invalid for SubAgentConfig: the required field `description` is missing."))
      }
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of SubAgentConfig
    toString = function() {
      self$toJSONString()
    },

    #' @description
    #' Return true if the values in all fields are valid.
    #'
    #' @return true if the values in all fields are valid.
    isValid = function() {
      # check if the required `id` is null
      if (is.null(self$`id`)) {
        return(FALSE)
      }

      # check if the required `name` is null
      if (is.null(self$`name`)) {
        return(FALSE)
      }

      # check if the required `description` is null
      if (is.null(self$`description`)) {
        return(FALSE)
      }

      if (self$`maxSteps` > 50) {
        return(FALSE)
      }
      if (self$`maxSteps` < 1) {
        return(FALSE)
      }

      TRUE
    },

    #' @description
    #' Return a list of invalid fields (if any).
    #'
    #' @return A list of invalid fields (if any).
    getInvalidFields = function() {
      invalid_fields <- list()
      # check if the required `id` is null
      if (is.null(self$`id`)) {
        invalid_fields["id"] <- "Non-nullable required field `id` cannot be null."
      }

      # check if the required `name` is null
      if (is.null(self$`name`)) {
        invalid_fields["name"] <- "Non-nullable required field `name` cannot be null."
      }

      # check if the required `description` is null
      if (is.null(self$`description`)) {
        invalid_fields["description"] <- "Non-nullable required field `description` cannot be null."
      }

      if (self$`maxSteps` > 50) {
        invalid_fields["maxSteps"] <- "Invalid value for `maxSteps`, must be smaller than or equal to 50."
      }
      if (self$`maxSteps` < 1) {
        invalid_fields["maxSteps"] <- "Invalid value for `maxSteps`, must be bigger than or equal to 1."
      }

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
# SubAgentConfig$unlock()
#
## Below is an example to define the print function
# SubAgentConfig$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# SubAgentConfig$lock()

