#' Create a new RunRequest
#'
#' @description
#' RunRequest Class
#'
#' @docType class
#' @title RunRequest
#' @description RunRequest Class
#' @format An \code{R6Class} generator object
#' @field prompt The research task or question. character
#' @field stream If true, response is an SSE stream of AgentEvent objects. character [optional]
#' @field format Desired output format. If set, agent will format data accordingly. character [optional]
#' @field schema JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \"find all items.\" The final output is compiled into this exact shape. Used with format=json. object [optional]
#' @field columns Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry. list(character) [optional]
#' @field urls Seed URLs to start from instead of searching. list(character) [optional]
#' @field model  \link{ModelConfig} [optional]
#' @field subAgentModel  \link{ModelConfig} [optional]
#' @field maxSteps Maximum agent steps before stopping. integer [optional]
#' @field skills Skills to pre-load for this run. list(character) [optional]
#' @field skillInstructions Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded. named list(character) [optional]
#' @field subAgents Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to. list(\link{SubAgentConfig}) [optional]
#' @field exportSkill When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response. character [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
RunRequest <- R6::R6Class(
  "RunRequest",
  public = list(
    `prompt` = NULL,
    `stream` = NULL,
    `format` = NULL,
    `schema` = NULL,
    `columns` = NULL,
    `urls` = NULL,
    `model` = NULL,
    `subAgentModel` = NULL,
    `maxSteps` = NULL,
    `skills` = NULL,
    `skillInstructions` = NULL,
    `subAgents` = NULL,
    `exportSkill` = NULL,

    #' @description
    #' Initialize a new RunRequest class.
    #'
    #' @param prompt The research task or question.
    #' @param stream If true, response is an SSE stream of AgentEvent objects.. Default to FALSE.
    #' @param format Desired output format. If set, agent will format data accordingly.
    #' @param schema JSON schema that serves as both a research plan and output format. The agent treats each field as a data point to collect during research. Array fields mean \"find all items.\" The final output is compiled into this exact shape. Used with format=json.
    #' @param columns Column names for CSV output. Each column acts as a required data point the agent will research. The final CSV contains one column per entry.
    #' @param urls Seed URLs to start from instead of searching.
    #' @param model model
    #' @param subAgentModel subAgentModel
    #' @param maxSteps Maximum agent steps before stopping.. Default to 15.
    #' @param skills Skills to pre-load for this run.
    #' @param skillInstructions Per-skill custom instructions. Keys are skill names, values are instruction strings appended when the skill is loaded.
    #' @param subAgents Sub-agents available during this run. Each sub-agent becomes a tool the orchestrator can delegate tasks to.
    #' @param exportSkill When true, post-processes the run into a reusable skill package (SKILL.md + workflow.mjs + schema.json) returned in the response.. Default to FALSE.
    #' @param ... Other optional arguments.
    initialize = function(`prompt`, `stream` = FALSE, `format` = NULL, `schema` = NULL, `columns` = NULL, `urls` = NULL, `model` = NULL, `subAgentModel` = NULL, `maxSteps` = 15, `skills` = NULL, `skillInstructions` = NULL, `subAgents` = NULL, `exportSkill` = FALSE, ...) {
      if (!missing(`prompt`)) {
        if (!(is.character(`prompt`) && length(`prompt`) == 1)) {
          stop(paste("Error! Invalid data for `prompt`. Must be a string:", `prompt`))
        }
        self$`prompt` <- `prompt`
      }
      if (!is.null(`stream`)) {
        if (!(is.logical(`stream`) && length(`stream`) == 1)) {
          stop(paste("Error! Invalid data for `stream`. Must be a boolean:", `stream`))
        }
        self$`stream` <- `stream`
      }
      if (!is.null(`format`)) {
        if (!(`format` %in% c("json", "csv", "markdown"))) {
          stop(paste("Error! \"", `format`, "\" cannot be assigned to `format`. Must be \"json\", \"csv\", \"markdown\".", sep = ""))
        }
        if (!(is.character(`format`) && length(`format`) == 1)) {
          stop(paste("Error! Invalid data for `format`. Must be a string:", `format`))
        }
        self$`format` <- `format`
      }
      if (!is.null(`schema`)) {
        self$`schema` <- `schema`
      }
      if (!is.null(`columns`)) {
        stopifnot(is.vector(`columns`), length(`columns`) != 0)
        sapply(`columns`, function(x) stopifnot(is.character(x)))
        self$`columns` <- `columns`
      }
      if (!is.null(`urls`)) {
        stopifnot(is.vector(`urls`), length(`urls`) != 0)
        sapply(`urls`, function(x) stopifnot(is.character(x)))
        self$`urls` <- `urls`
      }
      if (!is.null(`model`)) {
        stopifnot(R6::is.R6(`model`))
        self$`model` <- `model`
      }
      if (!is.null(`subAgentModel`)) {
        stopifnot(R6::is.R6(`subAgentModel`))
        self$`subAgentModel` <- `subAgentModel`
      }
      if (!is.null(`maxSteps`)) {
        if (!(is.numeric(`maxSteps`) && length(`maxSteps`) == 1)) {
          stop(paste("Error! Invalid data for `maxSteps`. Must be an integer:", `maxSteps`))
        }
        self$`maxSteps` <- `maxSteps`
      }
      if (!is.null(`skills`)) {
        stopifnot(is.vector(`skills`), length(`skills`) != 0)
        sapply(`skills`, function(x) stopifnot(is.character(x)))
        self$`skills` <- `skills`
      }
      if (!is.null(`skillInstructions`)) {
        stopifnot(is.vector(`skillInstructions`), length(`skillInstructions`) != 0)
        sapply(`skillInstructions`, function(x) stopifnot(is.character(x)))
        self$`skillInstructions` <- `skillInstructions`
      }
      if (!is.null(`subAgents`)) {
        stopifnot(is.vector(`subAgents`), length(`subAgents`) != 0)
        sapply(`subAgents`, function(x) stopifnot(R6::is.R6(x)))
        self$`subAgents` <- `subAgents`
      }
      if (!is.null(`exportSkill`)) {
        if (!(is.logical(`exportSkill`) && length(`exportSkill`) == 1)) {
          stop(paste("Error! Invalid data for `exportSkill`. Must be a boolean:", `exportSkill`))
        }
        self$`exportSkill` <- `exportSkill`
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
    #' @return RunRequest as a base R list.
    #' @examples
    #' # convert array of RunRequest (x) to a data frame
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
    #' Convert RunRequest to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      RunRequestObject <- list()
      if (!is.null(self$`prompt`)) {
        RunRequestObject[["prompt"]] <-
          self$`prompt`
      }
      if (!is.null(self$`stream`)) {
        RunRequestObject[["stream"]] <-
          self$`stream`
      }
      if (!is.null(self$`format`)) {
        RunRequestObject[["format"]] <-
          self$`format`
      }
      if (!is.null(self$`schema`)) {
        RunRequestObject[["schema"]] <-
          self$`schema`
      }
      if (!is.null(self$`columns`)) {
        RunRequestObject[["columns"]] <-
          self$`columns`
      }
      if (!is.null(self$`urls`)) {
        RunRequestObject[["urls"]] <-
          self$`urls`
      }
      if (!is.null(self$`model`)) {
        RunRequestObject[["model"]] <-
          self$extractSimpleType(self$`model`)
      }
      if (!is.null(self$`subAgentModel`)) {
        RunRequestObject[["subAgentModel"]] <-
          self$extractSimpleType(self$`subAgentModel`)
      }
      if (!is.null(self$`maxSteps`)) {
        RunRequestObject[["maxSteps"]] <-
          self$`maxSteps`
      }
      if (!is.null(self$`skills`)) {
        RunRequestObject[["skills"]] <-
          self$`skills`
      }
      if (!is.null(self$`skillInstructions`)) {
        RunRequestObject[["skillInstructions"]] <-
          self$`skillInstructions`
      }
      if (!is.null(self$`subAgents`)) {
        RunRequestObject[["subAgents"]] <-
          self$extractSimpleType(self$`subAgents`)
      }
      if (!is.null(self$`exportSkill`)) {
        RunRequestObject[["exportSkill"]] <-
          self$`exportSkill`
      }
      return(RunRequestObject)
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
    #' Deserialize JSON string into an instance of RunRequest
    #'
    #' @param input_json the JSON input
    #' @return the instance of RunRequest
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`prompt`)) {
        self$`prompt` <- this_object$`prompt`
      }
      if (!is.null(this_object$`stream`)) {
        self$`stream` <- this_object$`stream`
      }
      if (!is.null(this_object$`format`)) {
        if (!is.null(this_object$`format`) && !(this_object$`format` %in% c("json", "csv", "markdown"))) {
          stop(paste("Error! \"", this_object$`format`, "\" cannot be assigned to `format`. Must be \"json\", \"csv\", \"markdown\".", sep = ""))
        }
        self$`format` <- this_object$`format`
      }
      if (!is.null(this_object$`schema`)) {
        self$`schema` <- this_object$`schema`
      }
      if (!is.null(this_object$`columns`)) {
        self$`columns` <- ApiClient$new()$deserializeObj(this_object$`columns`, "array[character]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`urls`)) {
        self$`urls` <- ApiClient$new()$deserializeObj(this_object$`urls`, "array[character]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`model`)) {
        `model_object` <- ModelConfig$new()
        `model_object`$fromJSON(jsonlite::toJSON(this_object$`model`, auto_unbox = TRUE, digits = NA))
        self$`model` <- `model_object`
      }
      if (!is.null(this_object$`subAgentModel`)) {
        `subagentmodel_object` <- ModelConfig$new()
        `subagentmodel_object`$fromJSON(jsonlite::toJSON(this_object$`subAgentModel`, auto_unbox = TRUE, digits = NA))
        self$`subAgentModel` <- `subagentmodel_object`
      }
      if (!is.null(this_object$`maxSteps`)) {
        self$`maxSteps` <- this_object$`maxSteps`
      }
      if (!is.null(this_object$`skills`)) {
        self$`skills` <- ApiClient$new()$deserializeObj(this_object$`skills`, "array[character]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`skillInstructions`)) {
        self$`skillInstructions` <- ApiClient$new()$deserializeObj(this_object$`skillInstructions`, "map(character)", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`subAgents`)) {
        self$`subAgents` <- ApiClient$new()$deserializeObj(this_object$`subAgents`, "array[SubAgentConfig]", loadNamespace("openapi"))
      }
      if (!is.null(this_object$`exportSkill`)) {
        self$`exportSkill` <- this_object$`exportSkill`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return RunRequest in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of RunRequest
    #'
    #' @param input_json the JSON input
    #' @return the instance of RunRequest
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`prompt` <- this_object$`prompt`
      self$`stream` <- this_object$`stream`
      if (!is.null(this_object$`format`) && !(this_object$`format` %in% c("json", "csv", "markdown"))) {
        stop(paste("Error! \"", this_object$`format`, "\" cannot be assigned to `format`. Must be \"json\", \"csv\", \"markdown\".", sep = ""))
      }
      self$`format` <- this_object$`format`
      self$`schema` <- this_object$`schema`
      self$`columns` <- ApiClient$new()$deserializeObj(this_object$`columns`, "array[character]", loadNamespace("openapi"))
      self$`urls` <- ApiClient$new()$deserializeObj(this_object$`urls`, "array[character]", loadNamespace("openapi"))
      self$`model` <- ModelConfig$new()$fromJSON(jsonlite::toJSON(this_object$`model`, auto_unbox = TRUE, digits = NA))
      self$`subAgentModel` <- ModelConfig$new()$fromJSON(jsonlite::toJSON(this_object$`subAgentModel`, auto_unbox = TRUE, digits = NA))
      self$`maxSteps` <- this_object$`maxSteps`
      self$`skills` <- ApiClient$new()$deserializeObj(this_object$`skills`, "array[character]", loadNamespace("openapi"))
      self$`skillInstructions` <- ApiClient$new()$deserializeObj(this_object$`skillInstructions`, "map(character)", loadNamespace("openapi"))
      self$`subAgents` <- ApiClient$new()$deserializeObj(this_object$`subAgents`, "array[SubAgentConfig]", loadNamespace("openapi"))
      self$`exportSkill` <- this_object$`exportSkill`
      self
    },

    #' @description
    #' Validate JSON input with respect to RunRequest and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
      # check the required field `prompt`
      if (!is.null(input_json$`prompt`)) {
        if (!(is.character(input_json$`prompt`) && length(input_json$`prompt`) == 1)) {
          stop(paste("Error! Invalid data for `prompt`. Must be a string:", input_json$`prompt`))
        }
      } else {
        stop(paste("The JSON input `", input, "` is invalid for RunRequest: the required field `prompt` is missing."))
      }
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of RunRequest
    toString = function() {
      self$toJSONString()
    },

    #' @description
    #' Return true if the values in all fields are valid.
    #'
    #' @return true if the values in all fields are valid.
    isValid = function() {
      # check if the required `prompt` is null
      if (is.null(self$`prompt`)) {
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
      # check if the required `prompt` is null
      if (is.null(self$`prompt`)) {
        invalid_fields["prompt"] <- "Non-nullable required field `prompt` cannot be null."
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
# RunRequest$unlock()
#
## Below is an example to define the print function
# RunRequest$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# RunRequest$lock()

