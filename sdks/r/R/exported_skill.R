#' Create a new ExportedSkill
#'
#' @description
#' A reusable skill package generated from the run's tool call history. Present when exportSkill=true in the request. 
#'
#' @docType class
#' @title ExportedSkill
#' @description ExportedSkill Class
#' @format An \code{R6Class} generator object
#' @field name Slug identifier for the skill. character [optional]
#' @field skillMd Full SKILL.md content with frontmatter. character [optional]
#' @field workflow Deterministic workflow.mjs script content. character [optional]
#' @field schema Expected output schema.json content. character [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
ExportedSkill <- R6::R6Class(
  "ExportedSkill",
  public = list(
    `name` = NULL,
    `skillMd` = NULL,
    `workflow` = NULL,
    `schema` = NULL,

    #' @description
    #' Initialize a new ExportedSkill class.
    #'
    #' @param name Slug identifier for the skill.
    #' @param skillMd Full SKILL.md content with frontmatter.
    #' @param workflow Deterministic workflow.mjs script content.
    #' @param schema Expected output schema.json content.
    #' @param ... Other optional arguments.
    initialize = function(`name` = NULL, `skillMd` = NULL, `workflow` = NULL, `schema` = NULL, ...) {
      if (!is.null(`name`)) {
        if (!(is.character(`name`) && length(`name`) == 1)) {
          stop(paste("Error! Invalid data for `name`. Must be a string:", `name`))
        }
        self$`name` <- `name`
      }
      if (!is.null(`skillMd`)) {
        if (!(is.character(`skillMd`) && length(`skillMd`) == 1)) {
          stop(paste("Error! Invalid data for `skillMd`. Must be a string:", `skillMd`))
        }
        self$`skillMd` <- `skillMd`
      }
      if (!is.null(`workflow`)) {
        if (!(is.character(`workflow`) && length(`workflow`) == 1)) {
          stop(paste("Error! Invalid data for `workflow`. Must be a string:", `workflow`))
        }
        self$`workflow` <- `workflow`
      }
      if (!is.null(`schema`)) {
        if (!(is.character(`schema`) && length(`schema`) == 1)) {
          stop(paste("Error! Invalid data for `schema`. Must be a string:", `schema`))
        }
        self$`schema` <- `schema`
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
    #' @return ExportedSkill as a base R list.
    #' @examples
    #' # convert array of ExportedSkill (x) to a data frame
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
    #' Convert ExportedSkill to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      ExportedSkillObject <- list()
      if (!is.null(self$`name`)) {
        ExportedSkillObject[["name"]] <-
          self$`name`
      }
      if (!is.null(self$`skillMd`)) {
        ExportedSkillObject[["skillMd"]] <-
          self$`skillMd`
      }
      if (!is.null(self$`workflow`)) {
        ExportedSkillObject[["workflow"]] <-
          self$`workflow`
      }
      if (!is.null(self$`schema`)) {
        ExportedSkillObject[["schema"]] <-
          self$`schema`
      }
      return(ExportedSkillObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of ExportedSkill
    #'
    #' @param input_json the JSON input
    #' @return the instance of ExportedSkill
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`name`)) {
        self$`name` <- this_object$`name`
      }
      if (!is.null(this_object$`skillMd`)) {
        self$`skillMd` <- this_object$`skillMd`
      }
      if (!is.null(this_object$`workflow`)) {
        self$`workflow` <- this_object$`workflow`
      }
      if (!is.null(this_object$`schema`)) {
        self$`schema` <- this_object$`schema`
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return ExportedSkill in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of ExportedSkill
    #'
    #' @param input_json the JSON input
    #' @return the instance of ExportedSkill
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`name` <- this_object$`name`
      self$`skillMd` <- this_object$`skillMd`
      self$`workflow` <- this_object$`workflow`
      self$`schema` <- this_object$`schema`
      self
    },

    #' @description
    #' Validate JSON input with respect to ExportedSkill and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of ExportedSkill
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
# ExportedSkill$unlock()
#
## Below is an example to define the print function
# ExportedSkill$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# ExportedSkill$lock()

