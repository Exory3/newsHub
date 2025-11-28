import { useNavigate } from "react-router";
import { articleInfo } from "../ArticlePreview.styles";
import { actionButtons, formActions } from "./ArticleForm.styles";
import type { Mode, Status } from "./types";
interface Props {
  mode: Mode;
  isLoading: boolean;
  state: Status;
}
function FormControls({ state, mode, isLoading }: Props) {
  const navigate = useNavigate();
  return (
    <div className={articleInfo()}>
      <div>
        {state.errors && (
          <ul>
            {state.errors.map((err) => (
              <li key={err} className="text-red-300">
                {err}
              </li>
            ))}
          </ul>
        )}
        {state.status === "success" && (
          <p className="mx-8 text-green-300">
            Article successfully {mode === "create" ? "created" : "changed"}
          </p>
        )}
      </div>
      <div className={formActions()}>
        <button
          type="button"
          className={actionButtons()}
          onClick={() => navigate("..")}
        >
          Cancel
        </button>
        <button className={actionButtons()} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default FormControls;
