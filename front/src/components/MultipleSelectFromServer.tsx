import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Option {
  name: string;
}

interface OwnProps {
  request: string;
  resolveResponse(response: any): Option[];
  onChange(change: Option | Option[]): void;
  defaultValue: Option | Option[];
  multiple?: boolean;
  title: string;
}

const MultipleSelectFromServer: FunctionComponent<OwnProps> = ({
  title,
  request,
  resolveResponse,
  defaultValue,
  onChange,
  multiple = true,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<Option[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(request);
      const result = await response.json();

      if (active) {
        setOptions(resolveResponse(result));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, resolveResponse, request]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      multiple={multiple}
      style={{ padding: 12 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, value) => {
        onChange(value || []);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      defaultValue={defaultValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={title}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default MultipleSelectFromServer;
