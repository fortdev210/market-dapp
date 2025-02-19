import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers.js";
import chai from "chai";

const { expect } = chai;

describe("Marketplace contract", function () {
  async function deployMarketFixture() {
    const [owner, buyer, seller] = await ethers.getSigners();

    const hardhatMarket = await ethers.deployContract("Marketplace");
    await hardhatMarket.waitForDeployment();

    return { hardhatMarket, owner, buyer, seller };
  }

  it("Should set the right owner", async function () {
    const { hardhatMarket, owner } = await loadFixture(deployMarketFixture);
    expect(await hardhatMarket.owner()).to.equal(owner.address);
  });

  it("should match the market contract", async function () {
    const { hardhatMarket } = await loadFixture(deployMarketFixture);
    expect(await hardhatMarket.name()).to.equal("marketplace dapp");
  });

  it("should create a product", async function () {
    const { hardhatMarket } = await loadFixture(deployMarketFixture);

    const productPrice = ethers.parseEther("1");
    await hardhatMarket.createProduct("iPhone12", productPrice);

    const product = await hardhatMarket.products(1);

    expect(await hardhatMarket.productCount()).to.equal(1);
    expect(product.name).to.equal("iPhone12");
    expect(product.price).to.equal(productPrice);
  });

  it("should sell product", async function () {
    const { hardhatMarket, buyer } = await loadFixture(deployMarketFixture);

    const productPrice = ethers.parseEther("1");
    await hardhatMarket.createProduct("iPhone12", productPrice);

    await hardhatMarket
      .connect(buyer)
      .purchaseProduct(1, { value: productPrice });

    const product = await hardhatMarket.products(1);
    expect(product.owner).to.equal(buyer.address);
    expect(product.purchased).to.equal(true);
  });
});
