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
import { getAllSeekers } from "../../services/APIs/APIs";
import SeekerCard from "../../components/headhunt/SeekerCard";
import SeekerFilterPanel from "../../components/headhunt/SeekerFilterPanel";

const HeadHuntPage = () => {
  const [seekers, setSeekers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    education: "",
    experience: "",
  });

  const [filterOpen, setFilterOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        setLoading(true);
        const data = await getAllSeekers();
        setSeekers(data);
      } catch (err) {
        console.error("Failed to load seekers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, [filters]);

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
              <SeekerFilterPanel filters={filters} setFilters={setFilters} />
            </Grid>
          )}

          {/* Seekers List */}
          <Grid
            sx={{
              flexGrow: 1, // take remaining width
            }}
          >
            {loading ? (
              <Box textAlign="center" mt={4}>
                <CircularProgress />
              </Box>
            ) : seekers.length === 0 ? (
              <Typography>No seekers found</Typography>
            ) : (
              <Grid container spacing={2}>
                {seekers.map((seeker) => (
                  <Grid key={seeker.id}>
                    <SeekerCard seeker={seeker} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
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
            setFilters={setFilters}
            onClose={() => setFilterOpen(false)}
          />
        </Box>
      </Drawer>

      <FooterSection_1 />
    </>
  );
};

export default HeadHuntPage;
