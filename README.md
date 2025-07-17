![PotlockTemplates](https://github.com/user-attachments/assets/c9b989db-e7fa-471f-9dca-fe115a05ff17)

<center>

[**Templates Website**](https://templates.potlock.org) | [**GitHub Repository**](https://github.com/PotLock/templates)

</center>

Discover Potlock templates to quickly deploy your own open funding stack. This repository contains a directory of boilerplate templates to deploy pieces of the Potlock funding stack.

## Adding a New Template

To add a new template to the directory, follow these steps:

1.  **Add Template Image:**
    *   Place your template's image file in the `public/` directory.

2.  **Update Template Data:**
    *   Open the `app/page.tsx` file.
    *   Locate the `featuredTemplates` array.
    *   Add a new object to the array for your template. The object should have the following structure:

    ```javascript
    {
      id: 1, // Make sure to use a unique ID
      title: "Your Template Title",
      description: "A brief description of your template.",
      image: "/your-image-name.png", // Path to the image in the public/ directory
      frameworks: ["Next.js", "React"],
      contracts: ["Donate"],
      createdAt: "YYYY-MM-DD",
      blockchain: ["NEAR"],
      soon: false, // Set to true if the template is coming soon
      githubUrl: "https://github.com/your/repo",
    }
    ```

3.  **Submit a Pull Request:**
    *   Once you've added your template, create a pull request to the main repository.

## Contributing

We welcome contributions! If you'd like to report a bug or request a feature, please [create an issue](https://github.com/PotLock/templates/issues/new).

For more details, you can view the [Initial Requirements on Notion](https://potlock.notion.site/Potlock-Templates-117c1f4ba97e80daab11f17877448d8b?pvs=74).
