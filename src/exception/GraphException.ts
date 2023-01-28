import { Injectable } from "@nestjs/common";
import { ExceptionHandler } from "@nestjs/core/errors/exception-handler";
import { GraphQLError } from "graphql/error";
import { RuntimeException } from "@nestjs/core/errors/exceptions";

@Injectable()
export class GraphException extends RuntimeException {
  public static graphThrow(msg: string, statusCode: number) {
    return new GraphQLError(msg, {
      extensions: {
        code: statusCode
      }
    });
  }

  public static notFound(ObjectName: string) {
    return new GraphQLError(ObjectName + "_NOT_FOUND", {
      extensions: {
        code: 400
      }
    });
  }
}