import { z } from "zod";
import { tool } from "../../tool.js";
import { getProject } from "../../../management/projects.js";
import { mcpError, toContent } from "../../util.js";

export const get_project = tool(
  {
    name: "disable_user",
    description: "Disables or enables a Firebase user based on the UID of the user.",
    inputSchema: z.object({
      uid: z.string()
        .describe("the UID of the user to disable or enable."),
      disable: z.boolean()
        .describe("set to true to disable the user and false to enable"),
    }),
    annotations: {
      title: "Disable a user based on Firebase Auth UID.",
      readOnlyHint: true,
    },
  },
  async ({uid, disable}, { projectId }) => {
    if (!projectId) return mcpError(`No current project detected.`);
    return toContent(await getProject(projectId));
  },
);
