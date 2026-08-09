import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  CircularProgress,
  Drawer,
  Button,
  useMediaQuery,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import { getAllHHSeekers, getSeekerFiles } from "../../services/APIs/APIs";
import SeekerCard from "../../components/headhunt/SeekerCard";
import SeekerFilterPanel from "../../components/headhunt/SeekerFilterPanel";
import Pagination from "@mui/material/Pagination";
import SeekerCardSkeleton from "../../components/placeholders/SeekerCardSkeleton";

const HeadHuntPage = () => {
  const [seekers, setSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [perPage] = useState(12);

  const [totalPages, setTotalPages] = useState(1);
  const [totalSeekers, setTotalSeekers] = useState(0);

  const getLatestImage = (files: any[]) => {
    if (!Array.isArray(files)) return null;

    return (
      [...files]
        .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file.file_name))
        .sort(
          (a, b) =>
            new Date(b.uploaded_at).getTime() -
            new Date(a.uploaded_at).getTime(),
        )[0] || null
    );
  };

  const handleFilterChange = (newFilters: any) => {
    setPage(1);
    setFilters(newFilters);
  };

  // Filters
  const [filters, setFilters] = useState({
    job_type: "all",
    work_type: "all",
    location: "all",
    education: "all",
    experience: "",
    min_salary: "",
    max_salary: "",
    skills: "",
    languages: "",
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        setLoading(true);
        const response = await getAllHHSeekers({
          page,
          per_page: perPage,

          job_type: filters.job_type || "all",
          work_type: filters.work_type || "all",
          location: filters.location || "all",
          education: filters.education || "all",

          experience: filters.experience || undefined,
          min_salary: filters.min_salary || undefined,
          max_salary: filters.max_salary || undefined,

          skills: filters.skills || undefined,
          languages: filters.languages || undefined,
        });

        const seekersWithImages = await Promise.all(
          response.items.map(async (seeker: any) => {
            try {
              const filesData = await getSeekerFiles(seeker.UserId.toString());

              const files = Array.isArray(filesData) ? filesData : [filesData];

              const latestImage = getLatestImage(files);

              return {
                ...seeker,
                profileImage: latestImage?.file_url || null,
              };
            } catch (error) {
              console.error(
                `Failed to load image for seeker ${seeker.UserId}`,
                error,
              );

              return {
                ...seeker,
                profileImage: null,
              };
            }
          }),
        );

        setSeekers(seekersWithImages);

        setTotalPages(response.pages);
        setTotalSeekers(response.total);
        console.log(response);
      } catch (err) {
        console.error("Failed to load seekers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, [page, filters]);

  return (
    <>
      <Header_2 />

      <Breadcrumb
        title="Find Seekers"
        description="Search and connect with top talent"
        backgroundImage="/imgs/backgrounds/bg-5.jpeg"
        path={[{ label: "Employer", href: "/" }, { label: "Head Hunt" }]}
      />

      <Container sx={{ mt: 4, mb: 6 }}>
        {/* Mobile Filter Button */}
        {isMobile && (
          <Box mb={2} textAlign="right">
            <Button
              startIcon={<FilterListIcon />}
              variant="outlined"
              onClick={() => setFilterOpen(true)}
            >
              Filters
            </Button>
          </Box>
        )}

        <Grid
          container
          spacing={3}
          alignItems="flex-start"
          sx={{ flexWrap: "nowrap" }} // 🔴 KEY: prevent stacking on desktop
        >
          {/* Filter Panel - Desktop */}
          {!isMobile && (
            <Grid
              sx={{
                width: 280, // fixed sidebar width
                flexShrink: 0, // prevent shrinking
              }}
            >
              <SeekerFilterPanel
                filters={filters}
                setFilters={handleFilterChange}
              />
            </Grid>
          )}

          {/* Seekers List */}
          <Grid
            sx={{
              flexGrow: 1, // take remaining width
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">{totalSeekers} Seekers Found</Typography>

              <Typography variant="body2">
                Page {page} of {totalPages}
              </Typography>
            </Box>
            {loading ? (
              <Grid container spacing={2}>
                {Array.from({ length: perPage }).map((_, index) => (
                  <Grid
                    key={index}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ display: "flex" }}
                  >
                    <SeekerCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : seekers.length === 0 ? (
              <Typography>No seekers found</Typography>
            ) : (
              <Grid container spacing={2.5}>
                {seekers.map((seeker) => (
                  <Grid
                    key={seeker.id}
                    size={{ xs: 12, sm: 6, md: 4 }}
                    sx={{ display: "flex" }}
                  >
                    <SeekerCard seeker={seeker} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            page={page}
            count={totalPages}
            color="primary"
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <SeekerFilterPanel
            filters={filters}
            setFilters={handleFilterChange}
            onClose={() => setFilterOpen(false)}
          />
        </Box>
      </Drawer>

      <FooterSection_1 />
    </>
  );
};

export default HeadHuntPage;
