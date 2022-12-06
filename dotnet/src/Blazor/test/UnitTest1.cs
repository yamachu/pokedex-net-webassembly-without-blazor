namespace test;

using Microsoft.Playwright.MSTest;
using Microsoft.Playwright;

[TestClass]
public class Tests : PageTest
{
    [TestMethod]
    public async Task MyTest()
    {
        await Page.GotoAsync("http://localhost:5039/");

        await Page.GetByRole(AriaRole.Link, new() { NameString = "Pokedex" }).ClickAsync();

        await Page.GetByText("000: ヤマチュウ").ClickAsync();

        // await Page.PauseAsync();

    }
}
