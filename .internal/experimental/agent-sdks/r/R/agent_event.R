#' @docType class
#' @title AgentEvent
#'
#' @description AgentEvent Class
#'
#' @format An \code{R6Class} generator object
#'
#' @importFrom R6 R6Class
#' @importFrom jsonlite fromJSON toJSON
#' @export
AgentEvent <- R6::R6Class(
  "AgentEvent",
  public = list(
    #' @field actual_instance the object stored in this instance.
    actual_instance = NULL,
    #' @field actual_type the type of the object stored in this instance.
    actual_type = NULL,
    #' @field one_of  a list of types defined in the oneOf schema.
    one_of = list("AgentEventOneOf", "AgentEventOneOf1", "AgentEventOneOf2", "AgentEventOneOf3", "AgentEventOneOf4", "AgentEventOneOf5"),

    #' @description
    #' Initialize a new AgentEvent.
    #'
    #' @param instance an instance of the object defined in the oneOf schemas: "AgentEventOneOf", "AgentEventOneOf1", "AgentEventOneOf2", "AgentEventOneOf3", "AgentEventOneOf4", "AgentEventOneOf5"
    initialize = function(instance = NULL) {
      if (is.null(instance)) {
        # do nothing
      } else if (get(class(instance)[[1]], pos = -1)$classname ==  "AgentEventOneOf") {
        self$actual_instance <- instance
        self$actual_type <- "AgentEventOneOf"
      } else if (get(class(instance)[[1]], pos = -1)$classname ==  "AgentEventOneOf1") {
        self$actual_instance <- instance
        self$actual_type <- "AgentEventOneOf1"
      } else if (get(class(instance)[[1]], pos = -1)$classname ==  "AgentEventOneOf2") {
        self$actual_instance <- instance
        self$actual_type <- "AgentEventOneOf2"
      } else if (get(class(instance)[[1]], pos = -1)$classname ==  "AgentEventOneOf3") {
        self$actual_instance <- instance
        self$actual_type <- "AgentEventOneOf3"
      } else if (get(class(instance)[[1]], pos = -1)$classname ==  "AgentEventOneOf4") {
        self$actual_instance <- instance
        self$actual_type <- "AgentEventOneOf4"
      } else if (get(class(instance)[[1]], pos = -1)$classname ==  "AgentEventOneOf5") {
        self$actual_instance <- instance
        self$actual_type <- "AgentEventOneOf5"
      } else {
        stop(paste("Failed to initialize AgentEvent with oneOf schemas AgentEventOneOf, AgentEventOneOf1, AgentEventOneOf2, AgentEventOneOf3, AgentEventOneOf4, AgentEventOneOf5. Provided class name: ",
                   get(class(instance)[[1]], pos = -1)$classname))
      }
    },

    #' @description
    #' Deserialize JSON string into an instance of AgentEvent.
    #' An alias to the method `fromJSON` .
    #'
    #' @param input The input JSON.
    #'
    #' @return An instance of AgentEvent.
    fromJSONString = function(input) {
      self$fromJSON(input)
    },

    #' @description
    #' Deserialize JSON string into an instance of AgentEvent.
    #'
    #' @param input The input JSON.
    #'
    #' @return An instance of AgentEvent.
    fromJSON = function(input) {
      matched <- 0 # match counter
      matched_schemas <- list() #names of matched schemas
      error_messages <- list()
      instance <- NULL

      `AgentEventOneOf_result` <- tryCatch({
          `AgentEventOneOf`$public_methods$validateJSON(input)
          `AgentEventOneOf_instance` <- `AgentEventOneOf`$new()
          instance <- `AgentEventOneOf_instance`$fromJSON(input)
          instance_type <- "AgentEventOneOf"
          matched_schemas <- append(matched_schemas, "AgentEventOneOf")
          matched <- matched + 1
        },
        error = function(err) err
      )

      if (!is.null(`AgentEventOneOf_result`["error"])) {
        error_messages <- append(error_messages, `AgentEventOneOf_result`["message"])
      }

      `AgentEventOneOf1_result` <- tryCatch({
          `AgentEventOneOf1`$public_methods$validateJSON(input)
          `AgentEventOneOf1_instance` <- `AgentEventOneOf1`$new()
          instance <- `AgentEventOneOf1_instance`$fromJSON(input)
          instance_type <- "AgentEventOneOf1"
          matched_schemas <- append(matched_schemas, "AgentEventOneOf1")
          matched <- matched + 1
        },
        error = function(err) err
      )

      if (!is.null(`AgentEventOneOf1_result`["error"])) {
        error_messages <- append(error_messages, `AgentEventOneOf1_result`["message"])
      }

      `AgentEventOneOf2_result` <- tryCatch({
          `AgentEventOneOf2`$public_methods$validateJSON(input)
          `AgentEventOneOf2_instance` <- `AgentEventOneOf2`$new()
          instance <- `AgentEventOneOf2_instance`$fromJSON(input)
          instance_type <- "AgentEventOneOf2"
          matched_schemas <- append(matched_schemas, "AgentEventOneOf2")
          matched <- matched + 1
        },
        error = function(err) err
      )

      if (!is.null(`AgentEventOneOf2_result`["error"])) {
        error_messages <- append(error_messages, `AgentEventOneOf2_result`["message"])
      }

      `AgentEventOneOf3_result` <- tryCatch({
          `AgentEventOneOf3`$public_methods$validateJSON(input)
          `AgentEventOneOf3_instance` <- `AgentEventOneOf3`$new()
          instance <- `AgentEventOneOf3_instance`$fromJSON(input)
          instance_type <- "AgentEventOneOf3"
          matched_schemas <- append(matched_schemas, "AgentEventOneOf3")
          matched <- matched + 1
        },
        error = function(err) err
      )

      if (!is.null(`AgentEventOneOf3_result`["error"])) {
        error_messages <- append(error_messages, `AgentEventOneOf3_result`["message"])
      }

      `AgentEventOneOf4_result` <- tryCatch({
          `AgentEventOneOf4`$public_methods$validateJSON(input)
          `AgentEventOneOf4_instance` <- `AgentEventOneOf4`$new()
          instance <- `AgentEventOneOf4_instance`$fromJSON(input)
          instance_type <- "AgentEventOneOf4"
          matched_schemas <- append(matched_schemas, "AgentEventOneOf4")
          matched <- matched + 1
        },
        error = function(err) err
      )

      if (!is.null(`AgentEventOneOf4_result`["error"])) {
        error_messages <- append(error_messages, `AgentEventOneOf4_result`["message"])
      }

      `AgentEventOneOf5_result` <- tryCatch({
          `AgentEventOneOf5`$public_methods$validateJSON(input)
          `AgentEventOneOf5_instance` <- `AgentEventOneOf5`$new()
          instance <- `AgentEventOneOf5_instance`$fromJSON(input)
          instance_type <- "AgentEventOneOf5"
          matched_schemas <- append(matched_schemas, "AgentEventOneOf5")
          matched <- matched + 1
        },
        error = function(err) err
      )

      if (!is.null(`AgentEventOneOf5_result`["error"])) {
        error_messages <- append(error_messages, `AgentEventOneOf5_result`["message"])
      }

      if (matched == 1) {
        # successfully match exactly 1 schema specified in oneOf
        self$actual_instance <- instance
        self$actual_type <- instance_type
      } else if (matched > 1) {
        # more than 1 match
        stop(paste("Multiple matches found when deserializing the input into AgentEvent with oneOf schemas AgentEventOneOf, AgentEventOneOf1, AgentEventOneOf2, AgentEventOneOf3, AgentEventOneOf4, AgentEventOneOf5. Matched schemas: ",
                   paste(matched_schemas, collapse = ", ")))
      } else {
        # no match
        stop(paste("No match found when deserializing the input into AgentEvent with oneOf schemas AgentEventOneOf, AgentEventOneOf1, AgentEventOneOf2, AgentEventOneOf3, AgentEventOneOf4, AgentEventOneOf5. Details: >>",
                   paste(error_messages, collapse = " >> ")))
      }

      self
    },

    #' @description
    #' Serialize AgentEvent to JSON string.
    #' 
    #' @param ... Parameters passed to `jsonlite::toJSON`
    #' @return JSON string representation of the AgentEvent.
    toJSONString = function(...) {
      simple <- self$toSimpleType()
      if (!is.null(self$actual_instance)) {
        json <- jsonlite::toJSON(simple, auto_unbox = TRUE, ...)
        return(as.character(jsonlite::minify(json)))
      } else {
        return(NULL)
      }
    },

    #' @description
    #' Convert to an R object. This method is deprecated. Use `toSimpleType()` instead.
    toJSON = function() {
      .Deprecated(new = "toSimpleType", msg = "Use the '$toSimpleType()' method instead since that is more clearly named. Use '$toJSONString()' to get a JSON string")
      return(self$toSimpleType())
    },

    #' @description
    #' Convert AgentEvent to a base R type
    #'
    #' @return A base R type, e.g. a list or numeric/character array.
    toSimpleType = function() {
      if (!is.null(self$actual_instance)) {
        return(self$actual_instance$toSimpleType())
      } else {
        return(NULL)
      }
    },

    #' @description
    #' Validate the input JSON with respect to AgentEvent and
    #' throw exception if invalid.
    #'
    #' @param input The input JSON.
    validateJSON = function(input) {
      # backup current values
      actual_instance_bak <- self$actual_instance
      actual_type_bak <- self$actual_type

      # if it's not valid, an error will be thrown
      self$fromJSON(input)

      # no error thrown, restore old values
      self$actual_instance <- actual_instance_bak
      self$actual_type <- actual_type_bak
    },

    #' @description
    #' Returns the string representation of the instance.
    #'
    #' @return The string representation of the instance.
    toString = function() {
      jsoncontent <- c(
        sprintf('"actual_instance": %s', if (is.null(self$actual_instance)) NULL else self$actual_instance$toJSONString()),
        sprintf('"actual_type": "%s"', self$actual_type),
        sprintf('"one_of": "%s"', paste(unlist(self$one_of), collapse = ", "))
      )
      jsoncontent <- paste(jsoncontent, collapse = ",")
      as.character(jsonlite::prettify(paste("{", jsoncontent, "}", sep = "")))
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
#AgentEvent$unlock()
#
## Below is an example to define the print function
#AgentEvent$set("public", "print", function(...) {
#  print(jsonlite::prettify(self$toJSONString()))
#  invisible(self)
#})
## Uncomment below to lock the class to prevent modifications to the method or field
#AgentEvent$lock()

