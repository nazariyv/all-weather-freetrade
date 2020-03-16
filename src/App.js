import React, { useState } from "react";
import { styled } from "baseui";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control";
import { Button } from "baseui/button";
import { Block } from "baseui/block";
import { Label2, Label1, Paragraph2 } from "baseui/typography";

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
    <Centered style={{ marginTop: "50px" }}>
      <Label1>All Weather Portfolio Rebalancer</Label1>
      <Block
        display="flex"
        flexDirection="column"
        width={["80%", "50%"]}
        height="100%"
      >
        <Paragraph2>
          You will need to input 4 things: the amount of cash you wish to
          invest, and the prices of the assets. Please, round it to a whole
          number. For example, if S&P500 cost is 39.21 GBP, then input 40
        </Paragraph2>

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
        <Block width={["70%", "40%"]}>
          <Label2>Your allocation is</Label2>
          <FormControl label="SP500">
            <Input
              value={result["SP500"]}
              startEnhancer="#"
              endEnhancer="shares"
              disabled
            />
          </FormControl>
          <Input
            value={result["SP500"] * Math.ceil(sp500Price)}
            startEnhancer="GBP"
            disabled
          />
          <FormControl label="US Gvt Bnd 7-10yr">
            <Input
              value={result["Bonds"]}
              startEnhancer="#"
              endEnhancer="shares"
              disabled
            />
          </FormControl>
          <Input
            value={result["Bonds"] * Math.ceil(bondPrice)}
            startEnhancer="GBP"
            disabled
          />
          <FormControl label="Gold">
            <Input
              value={result["Gold"]}
              startEnhancer="#"
              endEnhancer="shares"
              disabled
            />
          </FormControl>
          <Input
            value={result["Gold"] * Math.ceil(goldPrice)}
            startEnhancer="GBP"
            disabled
          />
        </Block>
      )}
      <Block>
        <Button onClick={onSubmit}>Calculate Allocation</Button>
      </Block>
    </Centered>
  );
};
