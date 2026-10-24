import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getEmployerFiles } from "../../services/APIs/APIs";

interface CompanyLogoProps {
  employerId?: number | string;
  companyName?: string;
  size?: number | { xs: number; md: number };
}

const CompanyLogo = ({
  employerId,
  companyName,
  size = 52,
}: CompanyLogoProps) => {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    console.log(employerId);

    const fetchCompanyLogo = async () => {
      setLogo(null);

      if (!employerId) return;

      // Cache the logo separately for each company
      const cacheKey = `companyLogo_${employerId}`;
      const cachedLogo = localStorage.getItem(cacheKey);

      if (cachedLogo) {
        setLogo(cachedLogo);
        return;
      }

      try {
        const files = await getEmployerFiles(employerId);

        console.log(files);

        if (cancelled) return;

        if (Array.isArray(files)) {
          const imageFile = files.find(
            (file: any) =>
              file.FileCategory === "FileType.image" && file.FileUrl,
          );

          if (imageFile?.FileUrl) {
            setLogo(imageFile.FileUrl);
            localStorage.setItem(cacheKey, imageFile.FileUrl);
          }
        }
      } catch (error) {
        console.error(
          `Failed to fetch company logo for employer ${employerId}:`,
          error,
        );
      }
    };

    fetchCompanyLogo();

    return () => {
      cancelled = true;
    };
  }, [employerId]);

  return (
    <Avatar
      src={logo || undefined}
      alt={companyName || "Company"}
      imgProps={{
        onError: () => setLogo(null),
      }}
      sx={{
        width: size ?? 52,
        height: size ?? 52,
        borderRadius: 20,
        bgcolor: "secondary.main",
        color: "#fff",
        fontWeight: 600,
        fontSize: 28,
      }}
    >
      {companyName?.charAt(0).toUpperCase() || "C"}
    </Avatar>
  );
};

export default CompanyLogo;
