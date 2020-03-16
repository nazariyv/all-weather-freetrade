import React, { useState } from "react";
import { styled } from "baseui";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { Label2 } from "baseui/typography";

import Allocate from "./calculate";

const Centered = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  flexDirection: "column"
});

export default () => {
  const [sp500Price, setSp500Price] = useState(null);
  const [bondPrice, setBondPrice] = useState(null);
  const [goldPrice, setGoldPrice] = useState(null);
  const [cash, setCash] = useState(null);

  const [result, setResult] = useState(null);

  const onSubmit = e => {
    e.preventDefault();

    const yourAllocation = Allocate(sp500Price, goldPrice, bondPrice, cash);
    setResult(yourAllocation);
  };

  return (
    <Centered>
      <Block display="flex" flexDirection="column" width="100%" height="100%">
        <FormControl label="Cash you are investing">
          <Input
            value={cash}
            onChange={e => setCash(e.target.value)}
            startEnhancer="GBP"
          />
        </FormControl>
        <FormControl label="S&P 500 Price" caption="Round to whole number">
          <Input
            value={sp500Price}
            onChange={e => setSp500Price(e.target.value)}
            startEnhancer="GBP"
          />
        </FormControl>
        <FormControl
          label="US Gvt Bnd 7-10yr Price"
          caption="Round to whole number"
        >
          <Input
            value={bondPrice}
            onChange={e => setBondPrice(e.target.value)}
            startEnhancer="GBP"
          />
        </FormControl>
        <FormControl
          label="Physical Gold Price"
          caption="Round to whole number"
        >
          <Input
            value={goldPrice}
            onChange={e => setGoldPrice(e.target.value)}
            startEnhancer="GBP"
          />
        </FormControl>
      </Block>
      {result && (
        <Block>
          <Label2>Your allocation is</Label2>
          <FormControl label="SP500 Number of Shares">
            <Input value={result["SP500"]} disabled />
          </FormControl>
          <FormControl label="US Gvt Bnd 7-10yr Number of Shares">
            <Input value={result["Bonds"]} disabled />
          </FormControl>
          <FormControl>
            <Input value={result["Gold"]} disabled />
          </FormControl>
        </Block>
      )}
      <Block>
        <Button onClick={onSubmit}>Calculate Allocation</Button>
      </Block>
    </Centered>
  );
};
