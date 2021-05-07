import React, { FunctionComponent, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Option {
  name: string;
  id: string;
}

interface OwnProps {
  request: string;
  resolveResponse(response: any): Option[];
  onChange(change: Option | Option[]): void;
  multiple?: boolean;
  title: string;
  value: string | string[];
}

const MultipleSelectFromServer: FunctionComponent<OwnProps> = ({
  title,
  request,
  resolveResponse,
  value,
  onChange,
  multiple = true,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [formattedValue, setFormattedValue] = useState<Option[] | Option>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(request);
      const result = await response.json();

      return result;
    };

    if (!loading) {
      fetchdata().then((response) => {
        setOptions(resolveResponse(response));
        setLoading(false);
      });
    }
    return () => {};
  }, [request, loading, resolveResponse]);

  useEffect(() => {
    if (options.length) {
      if (Array.isArray(value)) {
        setFormattedValue(
          value.reduce((acc: Option[], item: string) => {
            const relatedOption = options.find((option) => option.id === item);
            if (!relatedOption) return acc;
            return [...acc, relatedOption];
          }, [])
        );
      } else {
        const relatedOption = options.find((option) => option.id === value);
        if (relatedOption) setFormattedValue(relatedOption);
      }
    }
  }, [value, options]);

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
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      value={formattedValue}
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
