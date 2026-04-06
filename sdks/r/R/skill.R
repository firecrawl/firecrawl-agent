#' Create a new Skill
#'
#' @description
#' Skill Class
#'
#' @docType class
#' @title Skill
#' @description Skill Class
#' @format An \code{R6Class} generator object
#' @field name  character [optional]
#' @field description  character [optional]
#' @field category  character [optional]
#' @field resources  list(character) [optional]
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
Skill <- R6::R6Class(
  "Skill",
  public = list(
    `name` = NULL,
    `description` = NULL,
    `category` = NULL,
    `resources` = NULL,

    #' @description
    #' Initialize a new Skill class.
    #'
    #' @param name name
    #' @param description description
    #' @param category category
    #' @param resources resources
    #' @param ... Other optional arguments.
    initialize = function(`name` = NULL, `description` = NULL, `category` = NULL, `resources` = NULL, ...) {
      if (!is.null(`name`)) {
        if (!(is.character(`name`) && length(`name`) == 1)) {
          stop(paste("Error! Invalid data for `name`. Must be a string:", `name`))
        }
        self$`name` <- `name`
      }
      if (!is.null(`description`)) {
        if (!(is.character(`description`) && length(`description`) == 1)) {
          stop(paste("Error! Invalid data for `description`. Must be a string:", `description`))
        }
        self$`description` <- `description`
      }
      if (!is.null(`category`)) {
        if (!(is.character(`category`) && length(`category`) == 1)) {
          stop(paste("Error! Invalid data for `category`. Must be a string:", `category`))
        }
        self$`category` <- `category`
      }
      if (!is.null(`resources`)) {
        stopifnot(is.vector(`resources`), length(`resources`) != 0)
        sapply(`resources`, function(x) stopifnot(is.character(x)))
        self$`resources` <- `resources`
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
    #' @return Skill as a base R list.
    #' @examples
    #' # convert array of Skill (x) to a data frame
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
    #' Convert Skill to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      SkillObject <- list()
      if (!is.null(self$`name`)) {
        SkillObject[["name"]] <-
          self$`name`
      }
      if (!is.null(self$`description`)) {
        SkillObject[["description"]] <-
          self$`description`
      }
      if (!is.null(self$`category`)) {
        SkillObject[["category"]] <-
          self$`category`
      }
      if (!is.null(self$`resources`)) {
        SkillObject[["resources"]] <-
          self$`resources`
      }
      return(SkillObject)
    },

    #' @description
    #' Deserialize JSON string into an instance of Skill
    #'
    #' @param input_json the JSON input
    #' @return the instance of Skill
    fromJSON = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      if (!is.null(this_object$`name`)) {
        self$`name` <- this_object$`name`
      }
      if (!is.null(this_object$`description`)) {
        self$`description` <- this_object$`description`
      }
      if (!is.null(this_object$`category`)) {
        self$`category` <- this_object$`category`
      }
      if (!is.null(this_object$`resources`)) {
        self$`resources` <- ApiClient$new()$deserializeObj(this_object$`resources`, "array[character]", loadNamespace("openapi"))
      }
      self
    },

    #' @description
    #' To JSON String
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return Skill in JSON format
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      json <- jsonlite::toJSON(simple, auto_unbox = TRUE, digits = NA, ...)
      return(as.character(jsonlite::minify(json)))
    },

    #' @description
    #' Deserialize JSON string into an instance of Skill
    #'
    #' @param input_json the JSON input
    #' @return the instance of Skill
    fromJSONString = function(input_json) {
      this_object <- jsonlite::fromJSON(input_json)
      self$`name` <- this_object$`name`
      self$`description` <- this_object$`description`
      self$`category` <- this_object$`category`
      self$`resources` <- ApiClient$new()$deserializeObj(this_object$`resources`, "array[character]", loadNamespace("openapi"))
      self
    },

    #' @description
    #' Validate JSON input with respect to Skill and throw an exception if invalid
    #'
    #' @param input the JSON input
    validateJSON = function(input) {
      input_json <- jsonlite::fromJSON(input)
    },

    #' @description
    #' To string (JSON format)
    #'
    #' @return String representation of Skill
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
# Skill$unlock()
#
## Below is an example to define the print function
# Skill$set("public", "print", function(...) {
#   print(jsonlite::prettify(self$toJSONString()))
#   invisible(self)
# })
## Uncomment below to lock the class to prevent modifications to the method or field
# Skill$lock()

